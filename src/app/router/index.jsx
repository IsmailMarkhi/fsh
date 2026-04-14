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
import Footer from "../../components/Footer";
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
    <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="mb-3 text-5xl font-extrabold">404</h1>
        <p className="mb-6 text-zinc-500">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-zinc-800"
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
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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

      {!isNotFound && <Footer />}
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