import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Layers3,
  CircleCheck,
  Lock,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowRight,
} from "lucide-react";

import {
  getCart,
  clearCartStorage,
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
} from "../lib/cartStorage";

function PageSeo({ title, description }) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}

function Toast({ open, type, title, message, onClose }) {
  const config =
    type === "warning"
      ? {
          wrap: "border-amber-500/30 bg-slate-950/95",
          iconWrap: "bg-amber-500/15 text-amber-300",
          Icon: AlertTriangle,
        }
      : {
          wrap: "border-emerald-500/30 bg-slate-950/95",
          iconWrap: "bg-emerald-500/15 text-emerald-300",
          Icon: CheckCircle2,
        };

  const Icon = config.Icon;

  return (
    <div
      className={`fixed right-3 top-24 z-[2000] w-[calc(100%-24px)] max-w-sm rounded-2xl border p-4 text-white shadow-2xl backdrop-blur transition-all duration-300 sm:right-5 ${
        config.wrap
      } ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
    >
      <div className="flex items-start gap-3">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${config.iconWrap}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 text-sm text-white/75">{message}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="text-white/60 transition hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function getStockClass(stock) {
  if (stock <= 0) return "bg-red-50 text-red-700 border border-red-200";
  if (stock <= 2) return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-emerald-50 text-emerald-700 border border-emerald-200";
}

function getStockLabel(stock) {
  if (stock <= 0) return "Out of stock";
  if (stock <= 2) return "Low stock";
  return "In stock";
}

function CartItem({ item, index, onIncrease, onDecrease, onRemove }) {
  const itemTotal = Number(item.price) * Number(item.qty);

  return (
    <article className="group flex flex-col justify-between gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 p-2">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-base font-bold leading-6 text-slate-950">
            {item.name}
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Unit price: ${Number(item.price).toFixed(2)}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStockClass(
                item.stock
              )}`}
            >
              {getStockLabel(item.stock)}
            </span>

            <span className="text-sm text-slate-500">Stock: {item.stock}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-3 md:w-auto md:justify-end">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
          <button
            type="button"
            onClick={() => onDecrease(index)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="min-w-6 text-center text-sm font-bold text-slate-950">
            {item.qty}
          </span>

          <button
            type="button"
            onClick={() => onIncrease(index)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="min-w-[76px] text-right text-base font-extrabold text-slate-950">
          ${itemTotal.toFixed(2)}
        </div>

        <button
          type="button"
          onClick={() => onRemove(index)}
          aria-label="Remove item"
          className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-red-200 bg-white text-red-700 transition hover:-translate-y-0.5 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({
    open: false,
    type: "success",
    title: "Success",
    message: "Action completed successfully.",
  });

  const refreshCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    refreshCart();

    const handleCartUpdated = () => refreshCart();
    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, []);

  useEffect(() => {
    if (!toast.open) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2400);

    return () => clearTimeout(timer);
  }, [toast.open]);

  const showToast = (type, title, message) => {
    setToast({
      open: true,
      type,
      title,
      message,
    });
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.qty), 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0),
    [cart]
  );

  const removeItem = (index) => {
    const item = cart[index];
    if (!item) return;

    const result = removeCartItem(index);
    if (!result?.ok) return;

    refreshCart();
    showToast("success", "Item removed", result.message);
  };

  const increaseQty = (index) => {
    const item = cart[index];
    if (!item) return;

    const result = increaseCartItem(index);

    if (!result?.ok) {
      showToast(
        "warning",
        "Stock limit reached",
        result?.message || `Only ${item.stock} unit(s) available for ${item.name}.`
      );
      return;
    }

    refreshCart();
    showToast("success", "Quantity updated", result.message);
  };

  const decreaseQty = (index) => {
    const item = cart[index];
    if (!item) return;

    const result = decreaseCartItem(index);
    if (!result?.ok) return;

    refreshCart();

    if (result.message.toLowerCase().includes("removed")) {
      showToast("success", "Item removed", result.message);
      return;
    }

    showToast("success", "Quantity updated", result.message);
  };

  const clearCart = () => {
    clearCartStorage();
    refreshCart();
    showToast("success", "Cart cleared", "All items have been removed from your cart.");
  };

  const goToCheckout = () => {
    if (!cart.length) {
      showToast("warning", "Cart is empty", "Add products before proceeding to checkout.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <>
      <PageSeo
        title="FeatureShoes | Cart"
        description="Review your selected products, update quantities, and proceed to checkout on FeatureShoes."
      />

      <Toast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <main className="bg-slate-50 text-slate-900">
        <section className="px-4 pb-5 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl xl:grid-cols-[1.1fr_0.9fr]">
              <article>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-emerald-200">
                  <ShoppingBag className="h-4 w-4" />
                  Shopping cart
                </div>

                <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-5xl">
                  Review your selected items before moving to checkout.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
                  Manage quantities, keep track of stock, and move to checkout with a cleaner and more reliable flow.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <Layers3 className="h-4 w-4" />
                    Clear item summary
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <CircleCheck className="h-4 w-4" />
                    Live quantity updates
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <Lock className="h-4 w-4" />
                    Checkout ready
                  </span>
                </div>
              </article>

              <aside className="grid gap-4">
                {[
                  [
                    "Flexible quantity control",
                    "Increase or decrease item quantities directly inside the cart interface.",
                  ],
                  [
                    "Stock-aware actions",
                    "Quantity changes respect available stock and notify the user cleanly.",
                  ],
                  [
                    "Faster checkout flow",
                    "Move from product review to payment with a clearer commercial structure.",
                  ],
                ].map(([title, text]) => (
                  <article
                    key={title}
                    className="rounded-[20px] border border-white/10 bg-white/10 p-5"
                  >
                    <strong className="block text-base font-bold">{title}</strong>
                    <p className="mt-1 text-sm text-white/75">{text}</p>
                  </article>
                ))}
              </aside>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 pt-3">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
              <section className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                      Your Cart
                    </h2>
                    <p className="mt-2 text-slate-500">
                      Review products, adjust quantities, or remove items before checkout.
                    </p>
                  </div>

                  {cart.length > 0 && (
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                      {totalItems} item{totalItems > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-4">
                  {cart.length === 0 ? (
                    <div className="rounded-[22px] border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                      <div className="mb-3 flex justify-center text-slate-400">
                        <ShoppingBag className="h-8 w-8" />
                      </div>

                      <h3 className="text-lg font-bold text-slate-950">
                        Your cart is empty
                      </h3>

                      <p className="mt-2 text-slate-500">
                        Add products to your cart before proceeding to checkout.
                      </p>

                      <Link
                        to="/products"
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                      >
                        Browse Products
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <CartItem
                        key={`${item.id}-${index}`}
                        item={item}
                        index={index}
                        onIncrease={increaseQty}
                        onDecrease={decreaseQty}
                        onRemove={removeItem}
                      />
                    ))
                  )}
                </div>
              </section>

              <aside className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm xl:sticky xl:top-[104px] xl:self-start">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                  Order Summary
                </h2>
                <p className="mt-2 text-slate-500">
                  A concise breakdown of your current cart before checkout.
                </p>

                <div className="mt-6 grid gap-2">
                  <div className="flex items-center justify-between gap-4 py-2 text-sm text-slate-700">
                    <span>Items</span>
                    <strong className="text-slate-950">{totalItems}</strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 text-sm text-slate-700">
                    <span>Subtotal</span>
                    <strong className="text-slate-950">${totalPrice.toFixed(2)}</strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 text-sm text-slate-700">
                    <span>Shipping</span>
                    <strong className="text-slate-950">Included</strong>
                  </div>
                </div>

                <div className="my-3 h-px bg-slate-200" />

                <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-extrabold text-slate-950">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="mt-5 grid gap-3">
                  {[
                    [
                      ShieldCheck,
                      "Protected checkout",
                      "Continue to a cleaner and more secure payment flow.",
                    ],
                    [
                      Truck,
                      "Fast delivery flow",
                      "Your order moves quickly from cart to checkout processing.",
                    ],
                    [
                      RotateCcw,
                      "Easy order review",
                      "Make adjustments here before confirming the final payment.",
                    ],
                  ].map(([Icon, title, text]) => (
                    <article
                      key={title}
                      className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-50 text-green-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <strong className="block text-sm font-bold text-slate-950">
                          {title}
                        </strong>
                        <span className="mt-1 block text-sm text-slate-500">
                          {text}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {cart.length > 0 && (
                  <div className="mt-5 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={goToCheckout}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                    >
                      <CreditCard className="h-4 w-4" />
                      Proceed to Checkout
                    </button>

                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                    >
                      Continue Shopping
                    </Link>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 transition hover:-translate-y-0.5 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Cart
                    </button>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}