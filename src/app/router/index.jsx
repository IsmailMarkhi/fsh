import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  matchRoutes,
} from "react-router-dom";

import { Suspense, lazy, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

/* --- Lazy pages --- */
const Home = lazy(() => import("../../pages/Home"));
const Products = lazy(() => import("../../pages/Products"));
const Cart = lazy(() => import("../../pages/Cart"));
const Checkout = lazy(() => import("../../pages/Checkout"));
const Contact = lazy(() => import("../../pages/Contact"));

/* --- 404 page --- */
function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center text-center">
      <div>
        <h1 className="text-5xl font-extrabold mb-3">404</h1>
        <p className="text-zinc-500 mb-6">Page not found</p>
        <Link
          to="/"
          className="px-5 py-3 bg-black text-white rounded-xl"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

/* --- Scroll --- */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // instant scroll (better UX)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* --- Footer --- */
function SiteFooter() {
  return (
    <footer className="mt-10 bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <section>
            <h2 className="text-lg font-bold">FeatureShoes</h2>
            <p className="text-sm text-white/60 mt-2">
              Premium football footwear store.
            </p>
          </section>

          <section>
            <h3 className="font-bold">Shop</h3>
            <div className="mt-3 space-y-2 text-sm">
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </section>

          <section>
            <h3 className="font-bold">Company</h3>
            <div className="mt-3 space-y-2 text-sm">
              <Link to="/">Home</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </section>

          <section>
            <h3 className="font-bold">Support</h3>
            <p className="text-sm text-white/60 mt-3">
              support@featureshoes.com
            </p>
          </section>

        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/60">
          © 2025 FeatureShoes
        </div>

      </div>
    </footer>
  );
}

/* --- ROUTES CONFIG --- */
const appRoutes = [
  { path: "/" },
  { path: "/products" },
  { path: "/cart" },
  { path: "/checkout" },
  { path: "/contact" },
];

/* --- MAIN LAYOUT --- */
function RouterShell() {
  const location = useLocation();

  const matched = matchRoutes(appRoutes, location);
  const isNotFound = !matched;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <ScrollToTop />

      {/* Hide navbar on 404 */}
      {!isNotFound && <Navbar />}

      <Suspense fallback={<Loader text="Loading page..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isNotFound && <SiteFooter />}

    </div>
  );
}

/* --- ROOT --- */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <RouterShell />
    </BrowserRouter>
  );
}