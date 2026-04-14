import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Star,
  X,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

function getStockUi(stock) {
  if (stock <= 0) {
    return {
      label: "Out of stock",
      className: "bg-red-100 text-red-600 border border-red-200",
    };
  }

  if (stock <= 2) {
    return {
      label: "Low stock",
      className: "bg-amber-100 text-amber-700 border border-amber-200",
    };
  }

  return {
    label: "In stock",
    className: "bg-green-100 text-green-700 border border-green-200",
  };
}

function ProductDetailsModal({ product, open, onClose, onAddToCart }) {
  if (!open) return null;

  const stockUi = getStockUi(product.stock);
  const roundedRating = Math.round(product.rating);

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm">
      <div className="h-full overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-start justify-center p-3 sm:p-4 lg:items-center">
          <div className="my-4 w-full max-w-5xl overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl sm:my-6 sm:rounded-[28px]">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Product Details
                </p>
                <h2 className="truncate text-base font-extrabold text-slate-950 sm:text-lg">
                  {product.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="ml-4 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="modal-scrollbar max-h-[calc(92vh-70px)] overflow-y-auto">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative flex min-h-[240px] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:min-h-[320px] sm:p-6 lg:min-h-[480px] lg:p-8">
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                      {product.badge}
                    </span>

                    {product.stock <= 2 && product.stock > 0 && (
                      <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                        Limited
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08),_transparent_60%)]" />

                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 max-h-[220px] w-full max-w-[240px] object-contain drop-shadow-[0_18px_34px_rgba(15,23,42,0.16)] sm:max-h-[300px] sm:max-w-[320px] lg:max-h-[380px] lg:max-w-[400px]"
                  />
                </div>

                <div className="p-4 sm:p-5 lg:p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                        {product.name}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                        {product.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-2xl font-extrabold text-slate-950">
                      ${product.price}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < roundedRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-slate-600">
                        {product.rating} rating
                      </span>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-2 text-xs font-bold ${stockUi.className}`}
                    >
                      {stockUi.label}
                    </span>

                    <span className="text-sm font-semibold text-slate-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                        <Truck className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">Fast Delivery</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Quick shipping and smoother order handling.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">Secure Buying</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Clear checkout flow and safe payment support.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2 xl:col-span-1">
                      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">Performance Fit</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Built for comfort, control, and match-day confidence.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-cyan-600" />
                      <h4 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                        Product Overview
                      </h4>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-slate-600">
                      <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                        <span>Category</span>
                        <span className="font-semibold text-slate-900">
                          Football Footwear
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                        <span>Positioning</span>
                        <span className="font-semibold text-slate-900">
                          {product.badge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                        <span>Availability</span>
                        <span className="font-semibold text-slate-900">
                          {product.stock > 0 ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddToCart(product);
                        onClose();
                      }}
                      disabled={product.stock <= 0}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      {product.stock <= 0 ? "Unavailable" : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default function ProductCard({ product, onAddToCart }) {
  const stockUi = getStockUi(product.stock);
  const roundedRating = Math.round(product.rating);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (showDetails) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showDetails]);

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
        <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 p-6">
          <span className="absolute left-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>

          {product.stock <= 2 && product.stock > 0 && (
            <span className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
              Low Stock
            </span>
          )}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08),_transparent_65%)] opacity-0 transition duration-300 group-hover:opacity-100" />

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="relative z-10 h-[190px] w-full max-w-[220px] object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold leading-6 text-slate-950">
              {product.name}
            </h3>

            <div className="whitespace-nowrap text-base font-extrabold text-slate-950">
              ${product.price}
            </div>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-slate-500">
            {product.description}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < roundedRating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-slate-500">{product.rating} rating</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-2 text-xs font-bold ${stockUi.className}`}
            >
              {stockUi.label}
            </span>

            <span className="text-sm font-semibold text-slate-500">
              Stock: {product.stock}
            </span>
          </div>

          <div className="mt-auto flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={product.stock <= 0}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
            >
              Details
            </button>
          </div>
        </div>
      </article>

      <ProductDetailsModal
        product={product}
        open={showDetails}
        onClose={() => setShowDetails(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}