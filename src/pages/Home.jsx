import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  CreditCard,
  Headphones,
  Mail,
  Medal,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  X,
  Zap,
} from "lucide-react";

import heroMainDefault from "../assets/f50.avif";
import heroThumb1 from "../assets/ii4.png";
import heroThumb2 from "../assets/nb.webp";
import heroThumb3 from "../assets/ii8.avif";

import featured1 from "../assets/nb.webp";
import featured2 from "../assets/f50.avif";
import featured3 from "../assets/ii1.png";
import featured4 from "../assets/ii8.avif";

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

function Toast({ open, title, message, onClose }) {
  return (
    <div
      className={`fixed right-3 top-24 z-[100] w-[calc(100%-24px)] max-w-sm rounded-2xl border border-emerald-500/30 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur transition-all duration-300 sm:right-5 ${
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
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

function LazyImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  eager = false,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-200" />}

      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`transition-all duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}

function Rating({ value }) {
  const filled = Math.round(value);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < filled ? "fill-amber-400 text-amber-400" : "text-slate-300"
            }`}
          />
        ))}
      </div>
      <span className="text-slate-500">{value} rating</span>
    </div>
  );
}

const trustItems = [
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "Reliable shipping on every order.",
  },
  {
    icon: CreditCard,
    title: "Safe Payments",
    text: "Protected checkout process.",
  },
  {
    icon: Medal,
    title: "Trusted Brands",
    text: "Recognized performance labels.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    text: "Responsive customer assistance.",
  },
];

const valueItems = [
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "Orders are processed quickly to reduce delay between purchase and first use.",
  },
  {
    icon: ShieldCheck,
    title: "Easy Returns",
    text: "A simpler return experience improves trust and reduces hesitation before checkout.",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    text: "Payment reassurance and a clear checkout structure help increase conversion quality.",
  },
  {
    icon: Award,
    title: "Performance Quality",
    text: "Products are presented as durable, match-ready, and aligned with player needs.",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Goalkeeper Pro",
    price: 100,
    image: featured1,
    badge: "Best Seller",
    rating: 4.7,
    description:
      "Stability-focused design for firm positioning, support, and confident movement.",
  },
  {
    id: 2,
    name: "Predator Elite",
    price: 120,
    image: featured2,
    badge: "New",
    rating: 4.9,
    description:
      "Power-oriented build with improved grip and match-level confidence under pressure.",
  },
  {
    id: 3,
    name: "Speed Phantom",
    price: 105,
    image: featured3,
    badge: "Lightweight",
    rating: 4.4,
    description:
      "Built for acceleration with a lighter profile and quick-response movement support.",
  },
  {
    id: 4,
    name: "Midfield Master",
    price: 95,
    image: featured4,
    badge: "Editor’s Pick",
    rating: 4.6,
    description:
      "Balanced construction for control-oriented players who dictate the rhythm of play.",
  },
];

const heroChoices = [
  {
    id: 1,
    label: "Control",
    image: heroThumb1,
    title: "Predator Control",
    subtitle: "Precision touch and structured support",
  },
  {
    id: 2,
    label: "Speed",
    image: heroThumb2,
    title: "Velocity Speed",
    subtitle: "Built for quick transitions and fast movement",
  },
  {
    id: 3,
    label: "Comfort",
    image: heroThumb3,
    title: "Comfort Balance",
    subtitle: "A softer feel with stable match-day performance",
  },
];

const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "New Balance",
  "Reebok",
  "Under Armour",
];

export default function Home() {
  const [toast, setToast] = useState({
    open: false,
    title: "Success",
    message: "Action completed successfully.",
  });

  const [email, setEmail] = useState("");

  const [activeHero, setActiveHero] = useState({
    image: heroMainDefault,
    title: "Predator Elite",
    subtitle: "Featured product",
  });

  useEffect(() => {
    if (!toast.open) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2600);

    return () => clearTimeout(timer);
  }, [toast.open]);

  const stats = useMemo(
    () => [
      { value: "150+", label: "Products available" },
      { value: "20k+", label: "Customers served" },
      { value: "4.8/5", label: "Average buyer rating" },
    ],
    []
  );

  const showToast = (title, message) => {
    setToast({ open: true, title, message });
  };

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      showToast("Email required", "Please enter your email address first.");
      return;
    }

    showToast(
      "Subscription successful",
      "Thank you for subscribing to FeatureShoes."
    );
    setEmail("");
  };

  return (
    <>
      <PageSeo
        title="FeatureShoes | Premium Football Footwear"
        description="FeatureShoes offers premium football footwear with trusted brands, fast delivery, secure checkout, and performance-focused designs."
      />

      <Toast
        open={toast.open}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <main className="bg-slate-50 text-slate-900">
        {/* Hero */}
        <section className="px-4 pb-8 pt-8 sm:pt-10">
          <div className="mx-auto grid max-w-7xl gap-7 xl:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm md:p-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                <Sparkles className="h-4 w-4" />
                New season football collection
              </div>

              <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] text-slate-950 md:text-6xl">
                Premium football boots built for control, speed and confidence.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-500 md:text-[1.05rem]">
                Discover elite-level footwear designed for players who need
                precision, comfort, and durability. Explore the collection in a
                cleaner, faster, and more engaging shopping experience.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  <Store className="h-4 w-4" />
                  Explore Catalog
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  Speak to an Expert
                </Link>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-sm"
                  >
                    <strong className="block text-xl font-extrabold text-slate-950">
                      {stat.value}
                    </strong>
                    <span className="mt-1 block text-sm text-slate-500">
                      {stat.label}
                    </span>
                  </article>
                ))}
              </div>
            </article>

            <aside className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_right,_rgba(22,163,74,0.12),_transparent_36%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-7 shadow-sm">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(22,163,74,0.04)_100%)]" />

              <div className="relative z-10">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-xl">
                    <small className="block text-xs text-white/70">
                      {activeHero.subtitle}
                    </small>
                    <strong className="mt-1 block text-base">
                      {activeHero.title}
                    </strong>
                  </div>

                  <div className="hidden rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 md:block">
                    <div className="inline-flex items-center gap-2 text-sm font-bold">
                      <Zap className="h-4 w-4" />
                      Interactive preview
                    </div>
                  </div>
                </div>

                <div className="group relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-white/70 p-4 shadow-inner backdrop-blur sm:min-h-[420px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(22,163,74,0.10),_transparent_55%)]" />
                  <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-emerald-200/40 blur-2xl" />
                  <div className="absolute -right-8 bottom-8 h-36 w-36 rounded-full bg-lime-200/40 blur-2xl" />

                  <LazyImage
                    src={activeHero.image}
                    alt={activeHero.title}
                    eager
                    wrapperClassName="relative z-10"
                    className="w-full max-w-[430px] animate-[floatY_4.5s_ease-in-out_infinite] object-contain drop-shadow-[0_24px_42px_rgba(15,23,42,0.18)] transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {heroChoices.map((item) => {
                    const isActive = activeHero.image === item.image;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setActiveHero({
                            image: item.image,
                            title: item.title,
                            subtitle: item.label,
                          })
                        }
                        className={`group rounded-[20px] border p-3 text-left transition-all duration-300 ${
                          isActive
                            ? "border-emerald-400 bg-emerald-50 shadow-md"
                            : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-sm"
                        }`}
                      >
                        <LazyImage
                          src={item.image}
                          alt={item.label}
                          className="mx-auto mb-2 h-[92px] w-full object-contain transition duration-300 group-hover:scale-105"
                        />
                        <span className="block text-center text-sm font-semibold text-slate-700">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Trust strip */}
        <section className="px-4 pb-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="flex items-center gap-3">
                    <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[16px] bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block text-[0.96rem] text-slate-950">
                        {item.title}
                      </strong>
                      <span className="block text-sm text-slate-500">
                        {item.text}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Catalog preview */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                  Catalog Preview
                </h2>
                <p className="mt-2 max-w-2xl text-slate-500">
                  A curated selection from the product catalog to help visitors
                  discover the collection before going to the full products page.
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
              >
                View Full Catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 p-6">
                    <span className="absolute left-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                      {product.badge}
                    </span>

                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="h-[190px] w-full max-w-[220px] object-contain transition duration-300 group-hover:scale-105"
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

                    <p className="text-sm leading-6 text-slate-500">
                      {product.description}
                    </p>

                    <Rating value={product.rating} />

                    <div className="mt-auto pt-2">
                      <Link
                        to="/products"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                      >
                        See in Catalog
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="px-4 pb-8 pt-3">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                Trusted Brand Network
              </h2>
              <p className="mt-2 max-w-3xl text-slate-500">
                We structure the storefront around recognizable performance
                brands so customers immediately understand product positioning
                and quality expectations.
              </p>
            </div>

            <div className="grid gap-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {brands.map((brand) => (
                <article
                  key={brand}
                  className="flex min-h-[82px] items-center justify-center rounded-[18px] border border-slate-200 bg-slate-50 p-4 text-center text-sm font-bold text-slate-500 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  {brand}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                Why customers choose FeatureShoes
              </h2>
              <p className="mt-2 max-w-3xl text-slate-500">
                Strong e-commerce design is not only about products. It also
                needs trust, clarity, support, and friction reduction
                throughout the buying journey.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {valueItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-4 grid h-[56px] w-[56px] place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-base font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-12 pt-2">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 text-white shadow-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
                  Stay updated on new arrivals and exclusive releases.
                </h2>

                <p className="mt-3 max-w-2xl text-white/75">
                  Build a stronger commercial presence by collecting subscriber
                  intent early and guide visitors to the full catalog when they
                  are ready to explore.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-3 self-center sm:flex-row lg:justify-end"
              >
                <div className="relative min-w-0 flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
                  <input
                    type="email"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-white outline-none placeholder:text-white/55"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes floatY {
          0%, 100% {
            transform: rotate(-4deg) translateY(0);
          }
          50% {
            transform: rotate(-4deg) translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}