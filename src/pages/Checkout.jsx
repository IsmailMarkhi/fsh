import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  ShieldCheck,
  Box,
  CircleCheck,
  CreditCard,
  FileText,
  MailCheck,
  ShoppingBag,
  LoaderCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { getCart, clearCartStorage, getCartTotal } from "../lib/cartStorage";

import { loadStripe } from "@stripe/stripe-js";
/*
const stripePromise = loadStripe("pk_test_51R4n5gDcad9rUnxVUaJ9XcLBVOGZdqU6R7cQQuElCmKqw7fM7HHYc4rrA7J1lpegNSs1V8aqB2skp631Gv92vYCB00G6TxHnaW");

async function handleCheckout(cart) {
  const res = await fetch("http://localhost:3000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart }),
  });

  const data = await res.json();

  window.location.href = data.url;
}
*/

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

function Notice({ notice }) {
  if (!notice.show) return null;

  const config =
    notice.type === "success"
      ? {
          wrap: "border border-green-200 bg-green-50 text-green-700",
          Icon: CheckCircle2,
        }
      : notice.type === "error"
      ? {
          wrap: "border border-red-200 bg-red-50 text-red-700",
          Icon: XCircle,
        }
      : {
          wrap: "border border-amber-200 bg-amber-50 text-amber-700",
          Icon: AlertTriangle,
        };

  const Icon = config.Icon;

  return (
    <div className={`mb-5 flex items-start gap-3 rounded-[18px] p-4 ${config.wrap}`}>
      <div className="mt-0.5">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <strong className="block text-sm font-bold">{notice.title}</strong>
        <p className="mt-1 text-sm">{notice.message}</p>
      </div>
    </div>
  );
}

function CheckoutItem({ item }) {
  const safePrice = Number(item.price) || 0;
  const safeQty = Number(item.qty) || 0;
  const itemTotal = safePrice * safeQty;

  return (
    <article className="flex flex-col gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 p-2">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-base font-bold leading-6 text-slate-950">
            {item.name}
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Quantity: {safeQty}
          </p>

          <p className="text-sm text-slate-500">
            Unit price: ${safePrice.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="text-base font-extrabold text-slate-950">
        ${itemTotal.toFixed(2)}
      </div>
    </article>
  );
}

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [isPaying, setIsPaying] = useState(false);
  const [notice, setNotice] = useState({
    show: false,
    type: "success",
    title: "Payment successful",
    message: "Your order is being finalized and submitted.",
  });

  const paypalRef = useRef(null);
  const paypalRendered = useRef(false);
  const paypalScriptLoading = useRef(false);

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
    if (cart.length === 0) {
      setNotice({
        show: true,
        type: "warning",
        title: "No items to checkout",
        message:
          "Your cart is currently empty. Add products first, then return to this page.",
      });
      paypalRendered.current = false;
      return;
    }

    setNotice((prev) =>
      prev.type === "warning" && prev.title === "No items to checkout"
        ? { ...prev, show: false }
        : prev
    );
  }, [cart]);

  const total = useMemo(() => getCartTotal(), [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  }, [cart]);

  useEffect(() => {
    if (!cart.length) return;
    if (!paypalRef.current) return;
    if (paypalRendered.current) return;

    const renderButtons = () => {
      if (!window.paypal || !paypalRef.current || paypalRendered.current) return;

      paypalRendered.current = true;

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            shape: "rect",
            label: "paypal",
          },

          createOrder: (_, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total.toFixed(2),
                  },
                },
              ],
            });
          },

          onApprove: async (_, actions) => {
            setIsPaying(true);

            try {
              const details = await actions.order.capture();
              const payerName = details?.payer?.name?.given_name || "customer";

              setNotice({
                show: true,
                type: "success",
                title: "Payment completed",
                message: `Payment completed successfully by ${payerName}. Your order has been confirmed.`,
              });

              clearCartStorage();
              setCart([]);

              setTimeout(() => {
                navigate("/");
              }, 2200);
            } catch (error) {
              setNotice({
                show: true,
                type: "error",
                title: "Payment error",
                message:
                  "An unexpected problem happened while confirming payment. Please try again.",
              });
            } finally {
              setIsPaying(false);
            }
          },

          onError: () => {
            setNotice({
              show: true,
              type: "error",
              title: "Payment failed",
              message: "Something went wrong during payment. Please try again.",
            });
            setIsPaying(false);
          },

          onCancel: () => {
            setNotice({
              show: true,
              type: "warning",
              title: "Payment canceled",
              message: "The payment process was canceled before completion.",
            });
            setIsPaying(false);
          },
        })
        .render(paypalRef.current);
    };

    const existingScript = document.querySelector(
      'script[data-paypal-sdk="featureshoes"]'
    );

    if (existingScript) {
      if (window.paypal) {
        renderButtons();
      } else {
        existingScript.addEventListener("load", renderButtons, { once: true });
      }
      return;
    }

    if (paypalScriptLoading.current) return;

    paypalScriptLoading.current = true;

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AeoIhVygg98cjsRo0SIYmRM4k8f57xecJgyLfhGPxcTb6PTgMCNYzYeZQ3Rnk-lNsTbcDSHWDS9Sd782&currency=USD";
    script.async = true;
    script.dataset.paypalSdk = "featureshoes";
    script.onload = renderButtons;
    document.body.appendChild(script);
  }, [cart, total, navigate]);

  return (
    <>
      <PageSeo
        title="FeatureShoes | Checkout"
        description="Review your order and complete payment securely on the FeatureShoes checkout page."
      />

      <main className="bg-slate-50 text-slate-900">
        <section className="px-4 pb-5 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl xl:grid-cols-[1.1fr_0.9fr]">
              <article>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-emerald-200">
                  <Lock className="h-4 w-4" />
                  Secure payment
                </div>

                <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-5xl">
                  Review your order and complete checkout with confidence.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
                  This checkout page gives customers a cleaner order summary,
                  clearer total visibility, and a stronger payment presentation
                  aligned with a professional storefront experience.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-4 w-4" />
                    Protected transaction
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <Box className="h-4 w-4" />
                    Order review
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <CircleCheck className="h-4 w-4" />
                    Smooth payment flow
                  </span>
                </div>
              </article>

              <aside className="grid gap-4">
                {[
                  [
                    "Transparent summary",
                    "Customers can review items, quantities, and total before paying.",
                  ],
                  [
                    "Trusted payment method",
                    "PayPal integration is displayed in a cleaner, more structured checkout area.",
                  ],
                  [
                    "Better feedback",
                    "Payment status is shown inside the page instead of disruptive browser popups.",
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
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                      Checkout Summary
                    </h2>
                    <p className="mt-2 text-slate-500">
                      Review your selected products before confirming the payment.
                    </p>
                  </div>

                  {cart.length > 0 && (
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                      {totalItems} item{totalItems > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Notice notice={notice} />
                </div>

                <div className="grid gap-4">
                  {!cart.length ? (
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
                      <CheckoutItem
                        key={`${item.id}-${index}`}
                        item={item}
                      />
                    ))
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/cart"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                  >
                    Back to Cart
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </section>

              <aside className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm xl:sticky xl:top-[104px] xl:self-start">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                  Payment Details
                </h2>

                <p className="mt-2 text-slate-500">
                  Complete your order securely using the payment method below.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    [
                      CreditCard,
                      "Secure payment flow",
                      "Your checkout is processed through a trusted payment interface.",
                    ],
                    [
                      FileText,
                      "Clear order total",
                      "Review subtotal and total amount before confirming payment.",
                    ],
                    [
                      MailCheck,
                      "Order submission",
                      "After successful payment, your order details are submitted automatically.",
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

                <div className="mt-6 space-y-1">
                  <div className="flex items-center justify-between gap-4 py-2 text-sm text-slate-700">
                    <span>Items subtotal</span>
                    <strong className="text-slate-950">${total.toFixed(2)}</strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 text-sm text-slate-700">
                    <span>Shipping</span>
                    <strong className="text-slate-950">Included</strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 text-sm text-slate-700">
                    <span>Total items</span>
                    <strong className="text-slate-950">{totalItems}</strong>
                  </div>

                  <div className="my-2 h-px bg-slate-200" />

                  <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-extrabold text-slate-950">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-[20px] border border-slate-200 bg-white p-5">
                  <div className="text-sm font-semibold text-slate-600">
                    Order summary
                  </div>

                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    {cart.length ? (
                      cart.map((item, index) => {
                        const lineTotal =
                          (Number(item.price) || 0) * (Number(item.qty) || 0);

                        return (
                          <div
                            key={`${item.id}-summary-${index}`}
                            className="flex items-start justify-between gap-4"
                          >
                            <span className="min-w-0">
                              {item.name} × {item.qty}
                            </span>
                            <span className="shrink-0 font-semibold text-slate-900">
                              ${lineTotal.toFixed(2)}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-slate-400">No items</p>
                    )}
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="mt-6 rounded-[20px] border border-slate-200 bg-white p-4">
                    <div className="relative min-h-[52px]">
                      {isPaying && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Processing payment...
                          </div>
                        </div>
                      )}

                      <div ref={paypalRef} />
                    </div>
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