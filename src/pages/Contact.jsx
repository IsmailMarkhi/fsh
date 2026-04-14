import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Clock3,
  Truck,
  MessageCircleMore,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  MessageSquareText,
  Zap,
  ArrowRight,
} from "lucide-react";
import PageSeo from "../components/PageSeo";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // success | error
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      return;
    }

    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/mjkyjbbq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <PageSeo
        title="FeatureShoes | Contact"
        description="Contact FeatureShoes for support, orders, or product inquiries."
      />

      <main className="bg-[#f6f7fb] text-slate-900">
        <section className="px-4 pt-10 pb-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
              <div className="animate-[fadeUp_.75s_ease_both]">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-emerald-200">
                  <MessageSquareText className="h-4 w-4" />
                  Customer assistance
                </div>

                <h1 className="max-w-[12ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-5xl">
                  Need help with an order or product question?
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                  Contact the FeatureShoes team for support related to products,
                  orders, delivery questions, or general customer assistance.
                  This page is designed to keep communication clear and easy on
                  every screen size.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <Zap className="h-4 w-4" />
                    Fast response flow
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <MessageCircleMore className="h-4 w-4" />
                    Clear communication
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-4 w-4" />
                    Reliable support
                  </span>
                </div>

                <a
                  href="https://wa.me/212723307462"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  💬 WhatsApp Support
                </a>
              </div>

              <div className="grid gap-4 animate-[fadeInRight_.85s_ease_both]">
                {[
                  [
                    "Order support",
                    "Get assistance with delivery, order issues, or cart and checkout questions.",
                  ],
                  [
                    "Product guidance",
                    "Ask about shoe types, sizing, stock availability, or model recommendations.",
                  ],
                  [
                    "Business contact",
                    "Use the same page to reach the team for general inquiries and support needs.",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[20px] border border-white/10 bg-white/10 p-5"
                  >
                    <strong className="block text-base font-bold">{title}</strong>
                    <p className="mt-1 text-sm text-white/75">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-14">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm animate-[fadeUp_.75s_ease_both]">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
                Contact Information
              </h2>

              <p className="mt-2 text-slate-500">
                Use the contact form or reach out through the support channels
                below. This layout improves trust and makes the page feel like a
                real company support section.
              </p>

              <div className="mt-6 grid gap-4">
                {[
                  [Mail, "Email support", "support@featureshoes.com"],
                  [Clock3, "Working hours", "Monday to Saturday — 09:00 to 18:00"],
                  [Truck, "Order assistance", "Delivery tracking, shipping updates, and product order help."],
                  [CheckCircle, "Response quality", "Structured support flow designed for better communication."],
                ].map(([Icon, title, text]) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-50 text-green-700">
                      <Icon size={18} />
                    </div>

                    <div>
                      <strong className="block text-sm font-bold text-slate-950">
                        {title}
                      </strong>
                      <p className="mt-1 text-sm text-slate-500">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <section className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm animate-[fadeUp_.85s_ease_both]">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
                Send a Message
              </h2>

              <p className="mt-2 text-slate-500">
                Fill in the form below and send your request directly. The
                layout is cleaner, more readable, and more responsive.
              </p>

              {status === "error" && (
                <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-red-200 bg-red-50 p-4 text-red-700">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold">
                      Form incomplete
                    </strong>
                    <p className="mt-1 text-sm">
                      Please fill in all required fields correctly before sending.
                    </p>
                  </div>
                </div>
              )}

              {status === "success" && (
                <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-green-200 bg-green-50 p-4 text-green-700">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold">
                      Message sent
                    </strong>
                    <p className="mt-1 text-sm">
                      Your message has been sent successfully.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-bold text-slate-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full rounded-2xl border px-4 py-3 text-[0.98rem] outline-none transition ${
                        status === "error" && !formData.name.trim()
                          ? "border-red-300 bg-red-50/50 focus:border-red-400"
                          : "border-slate-200 bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100"
                      }`}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-bold text-slate-700"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`w-full rounded-2xl border px-4 py-3 text-[0.98rem] outline-none transition ${
                        status === "error" && !formData.email.trim()
                          ? "border-red-300 bg-red-50/50 focus:border-red-400"
                          : "border-slate-200 bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-bold text-slate-700"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Example: Order support request"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[0.98rem] outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-bold text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your request, order issue, or question here..."
                    className={`w-full resize-y rounded-2xl border px-4 py-3 text-[0.98rem] outline-none transition ${
                      status === "error" && !formData.message.trim()
                        ? "border-red-300 bg-red-50/50 focus:border-red-400"
                        : "border-slate-200 bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100"
                    }`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <p className="text-sm text-slate-500">
                  Your information is used only to process your request and
                  respond to your message.
                </p>
              </form>
            </section>
          </div>
        </section>

        <style>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(24px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </main>
    </>
  );
}