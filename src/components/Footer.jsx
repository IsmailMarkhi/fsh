import { Link } from "react-router-dom";
import {
  Goal,
  Mail,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  shop: [
    { to: "/products", label: "Products" },
    { to: "/cart", label: "Cart" },
    { to: "/checkout", label: "Checkout" },
  ],
  company: [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <section>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 shadow-sm ring-1 ring-white/10">
                <Goal className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-lg font-extrabold tracking-tight">
                  FeatureShoes
                </h2>
                <p className="text-sm text-white/55">
                  Premium Football Footwear
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              A cleaner football footwear storefront focused on modern UI,
              responsive browsing, and a smoother customer shopping experience.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80">
                <Truck className="h-4 w-4 text-cyan-400" />
                Fast delivery
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                Secure checkout
              </span>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/90">
              Shop
            </h3>

            <nav className="mt-4 flex flex-col gap-3 text-sm text-white/65">
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4 text-cyan-400" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/90">
              Company
            </h3>

            <nav className="mt-4 flex flex-col gap-3 text-sm text-white/65">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4 text-cyan-400" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/90">
              Support
            </h3>

            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-white">Email Support</p>
                <p className="mt-1 text-sm text-white/60">
                  support@featureshoes.com
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Headphones className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-white">
                  Customer Assistance
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Quick support for product, cart, and order questions.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 FeatureShoes. All rights reserved.</p>
          <p>Built for a cleaner and more responsive e-commerce experience.</p>
        </div>
      </div>
    </footer>
  );
}