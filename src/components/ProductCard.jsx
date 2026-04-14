import { useState } from "react";
import {
  ShoppingBag,
  Star,
  X,
  ShieldCheck,
  Truck,
  BadgeCheck,
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-[1fr_1fr]">
          {/* Left */}
          <div className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 sm:min-h-[460px]">
            <div className="absolute left-6 top-6 flex flex-wrap gap-2">
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
              className="relative z-10 max-h-[340px] w-full max-w-[360px] object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.18)]"
            />
          </div>

          {/* Right */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  {product.name}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="text-2xl font-extrabold text-slate-950">
                ${product.price}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
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
                className={`rounded-full px-3 py-2 text-xs font-bold ${stockUi.className}`}
              >
                {stockUi.label}
              </span>

              <span className="text-sm font-semibold text-slate-500">
                Stock: {product.stock}
              </span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                  <Truck className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-slate-900">Fast Delivery</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Quick shipping and smooth order handling.
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

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-slate-900">Performance Fit</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Built for comfort, control, and match-day confidence.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[22px] border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                Product overview
              </h3>

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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onAddToCart(product)}
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
  );
}

export default function ProductCard({ product, onAddToCart }) {
  const stockUi = getStockUi(product.stock);
  const roundedRating = Math.round(product.rating);
  const [showDetails, setShowDetails] = useState(false);

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

          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
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