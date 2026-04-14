import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Goal,
  Menu,
  X,
  Truck,
  ShieldCheck,
  Headphones,
  Mail,
  ArrowRight,
} from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/checkout", label: "Checkout" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="hidden border-b border-white/10 bg-slate-950 text-sm text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-5 text-white/85">
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Fast nationwide delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Secure checkout
            </span>
            <span className="inline-flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Responsive support
            </span>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-white/85 transition hover:text-white"
          >
            <Mail className="h-4 w-4" />
            Contact support
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-4 px-4">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="FeatureShoes home"
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white shadow-sm ring-1 ring-slate-900/10 transition duration-300 group-hover:scale-105">
              <Goal className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-lg font-extrabold leading-none tracking-tight text-slate-950">
                FeatureShoes
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Performance Football Footwear
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 transition hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <nav
              className="flex items-center gap-6"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    [
                      "relative text-sm font-semibold transition",
                      isActive
                        ? "text-slate-950"
                        : "text-slate-600 hover:text-slate-950",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-cyan-600 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-700"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4">
            <nav
              className="flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    [
                      "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-cyan-50 text-cyan-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Truck className="h-4 w-4 text-cyan-600" />
                    Fast nationwide delivery
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-600" />
                    Secure checkout
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-950"
                  >
                    <Mail className="h-4 w-4 text-cyan-600" />
                    Contact support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}