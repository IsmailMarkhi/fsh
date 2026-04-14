import { addToCart } from "../lib/cartStorage";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layers3,
  ShieldCheck,
  Box,
  Truck,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import ProductCard from "../components/ProductCard";

import heroImage from "../assets/f50.avif";

import product1 from "../assets/f50.avif";
import product2 from "../assets/ii1.png";
import product3 from "../assets/ii8.avif";
import product4 from "../assets/ii2.png";

import product5 from "../assets/ii4.png";
import product6 from "../assets/ii5.png";
import product7 from "../assets/ii0.png";
import product8 from "../assets/ii9.png";

import product9 from "../assets/iiii61.avif";
import product10 from "../assets/iii6.avif";
import product11 from "../assets/iiii6.avif";
import product12 from "../assets/iiii67..avif";

import product13 from "../assets/nb.webp";
import product14 from "../assets/nb1.webp";
import product15 from "../assets/nb.2.png";
import product16 from "../assets/nb3.webp";

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
  const ui =
    type === "warning"
      ? {
          wrap: "border-amber-500/30 bg-slate-950/95",
          iconWrap: "bg-amber-500/15 text-amber-300",
          Icon: AlertTriangle,
        }
      : {
          wrap: "border-emerald-500/30 bg-slate-950/95",
          iconWrap: "bg-emerald-500/15 text-emerald-300",
          Icon: Check,
        };

  const Icon = ui.Icon;

  return (
    <div
      className={`fixed right-3 top-24 z-[100] w-[calc(100%-24px)] max-w-sm rounded-2xl border p-4 text-white shadow-2xl backdrop-blur transition-all duration-300 sm:right-5 ${
        ui.wrap
      } ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
    >
      <div className="flex items-start gap-3">
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${ui.iconWrap}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 text-sm text-white/75">{message}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-white/60 transition hover:text-white"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function addToCartStorage(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find((item) => item.id === product.id);

  if (product.stock <= 0) {
    return {
      ok: false,
      type: "warning",
      message: `${product.name} is currently out of stock.`,
    };
  }

  if (existing) {
    if (existing.qty >= product.stock) {
      return {
        ok: false,
        type: "warning",
        message: `Only ${product.stock} unit(s) available for ${product.name}.`,
      };
    }

    existing.qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));

    return {
      ok: true,
      type: "success",
      message: `${product.name} quantity increased in your cart.`,
    };
  }

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    qty: 1,
    stock: product.stock,
    badge: product.badge,
    rating: product.rating,
    description: product.description,
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));

  return {
    ok: true,
    type: "success",
    message: `${product.name} has been added to your cart.`,
  };
}

const products = [
  {
    id: 1,
    name: "Predator Elite",
    price: 120,
    image: product1,
    stock: 5,
    badge: "New",
    rating: 4.9,
    description:
      "Power-focused football boot with advanced grip and match-level control.",
  },
  {
    id: 2,
    name: "Speed Phantom",
    price: 105,
    image: product2,
    stock: 3,
    badge: "Lightweight",
    rating: 4.4,
    description:
      "Fast-response design built for acceleration and direct attacking movement.",
  },
  {
    id: 3,
    name: "Midfield Master",
    price: 95,
    image: product3,
    stock: 2,
    badge: "Editor’s Pick",
    rating: 4.6,
    description:
      "Balanced build for playmakers who control rhythm and passing accuracy.",
  },
  {
    id: 4,
    name: "Goalkeeper Pro",
    price: 100,
    image: product4,
    stock: 4,
    badge: "Best Seller",
    rating: 4.7,
    description:
      "Stability-driven support for positioning, balance, and confident saves.",
  },
  {
    id: 5,
    name: "Storm Chaser",
    price: 110,
    image: product5,
    stock: 6,
    badge: "Popular",
    rating: 4.5,
    description:
      "Versatile traction and durable construction for intensive match use.",
  },
  {
    id: 6,
    name: "Shadow Runner",
    price: 115,
    image: product6,
    stock: 1,
    badge: "Low Stock",
    rating: 4.3,
    description:
      "Speed-oriented upper with lightweight support for aggressive transitions.",
  },
  {
    id: 7,
    name: "Control Force",
    price: 108,
    image: product7,
    stock: 2,
    badge: "Control",
    rating: 4.6,
    description:
      "Touch-focused model for composed passing, turning, and close control.",
  },
  {
    id: 8,
    name: "Attack Zone",
    price: 130,
    image: product8,
    stock: 3,
    badge: "Premium",
    rating: 4.8,
    description:
      "Explosive attacking profile with strong grip and finishing support.",
  },
  {
    id: 9,
    name: "Goalkeeper Pro X",
    price: 100,
    image: product9,
    stock: 4,
    badge: "Reliable",
    rating: 4.4,
    description:
      "Goal-area support model with balanced comfort and strong lateral stability.",
  },
  {
    id: 10,
    name: "Storm Chaser X",
    price: 110,
    image: product10,
    stock: 6,
    badge: "New Drop",
    rating: 4.5,
    description:
      "Enhanced outer structure for durable all-match performance and energy return.",
  },
  {
    id: 11,
    name: "Shadow Runner X",
    price: 115,
    image: product11,
    stock: 1,
    badge: "Limited",
    rating: 4.2,
    description:
      "Limited-stock model for quick-footed players prioritizing speed and agility.",
  },
  {
    id: 12,
    name: "Control Force X",
    price: 108,
    image: product12,
    stock: 2,
    badge: "Control",
    rating: 4.5,
    description:
      "Technical profile designed for composure, support, and precision under pressure.",
  },
  {
    id: 13,
    name: "LWF Zone",
    price: 130,
    image: product13,
    stock: 3,
    badge: "Wing Play",
    rating: 4.6,
    description:
      "Designed for wide attackers needing pace, flexibility, and quick take-offs.",
  },
  {
    id: 14,
    name: "LMF Zone",
    price: 130,
    image: product14,
    stock: 3,
    badge: "Midfield",
    rating: 4.5,
    description:
      "Smooth fit and balanced stability for side midfield movement and coverage.",
  },
  {
    id: 15,
    name: "Left Back Zone",
    price: 130,
    image: product15,
    stock: 3,
    badge: "Defensive",
    rating: 4.4,
    description:
      "Defensive model tailored for strong traction, recovery runs, and support.",
  },
  {
    id: 16,
    name: "Center Zone",
    price: 130,
    image: product16,
    stock: 3,
    badge: "Central Play",
    rating: 4.7,
    description:
      "All-round construction for players who need structure and central control.",
  },
];

export default function Products() {
  const [toast, setToast] = useState({
    open: false,
    type: "success",
    title: "Success",
    message: "Action completed successfully.",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }, [currentPage]);

  useEffect(() => {
    if (!toast.open) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2600);

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

  const handleAddToCart = (product) => {
  const result = addToCart(product);

  if (!result.ok) {
    showToast("warning", "Stock limit reached", result.message);
    return;
  }

  showToast(
    "success",
    result.type === "updated" ? "Quantity updated" : "Added to cart",
    result.message
  );
};

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageSeo
        title="FeatureShoes | Products"
        description="Browse premium football footwear at FeatureShoes with clean product discovery, stock visibility, and responsive shopping experience."
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
            <div className="grid gap-6 rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl xl:grid-cols-[1.15fr_0.85fr]">
              <article>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-emerald-200">
                  <Layers3 className="h-4 w-4" />
                  Full product catalog
                </div>

                <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-5xl">
                  Find the right football boot for your role and playing style.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
                  Explore our curated collection of performance footwear built
                  for control, speed, stability, and match-day confidence. Each
                  product is presented with clear stock visibility and
                  streamlined add-to-cart actions.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-4 w-4" />
                    Secure shopping
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <Box className="h-4 w-4" />
                    Verified stock display
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <Truck className="h-4 w-4" />
                    Fast delivery
                  </span>
                </div>
              </article>

              <aside className="flex min-h-[280px] items-center justify-center">
                <img
                  src={heroImage}
                  alt="Featured football shoe"
                  loading="eager"
                  className="w-full max-w-[380px] rotate-[-4deg] object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                />
              </aside>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 pt-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                  Product Collection
                </h2>
                <p className="mt-2 max-w-3xl text-slate-500">
                  Browse the available models and add them to cart with a
                  smoother, company-style interface designed for clarity and
                  mobile responsiveness.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                  Showing {currentProducts.length} products
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                  {products.length} products total
                </div>
              </div>
            </div>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </section>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`min-h-11 min-w-11 rounded-xl border px-4 py-2 text-sm font-bold shadow-sm transition ${
                      page === currentPage
                        ? "border-cyan-600 bg-cyan-600 text-white"
                        : "border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}