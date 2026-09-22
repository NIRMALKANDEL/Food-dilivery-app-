import { useState } from "react";

const faqs = [
  {
    q: "How long does delivery usually take?",
    a: "Most orders arrive within 30-45 minutes, depending on the restaurant and your location. You can see an estimated time on every restaurant card.",
  },
  {
    q: "Can I change my order after placing it?",
    a: "You can adjust item quantities or remove items from your cart any time before checkout using the +/- controls on the cart page.",
  },
  {
    q: "What payment methods are supported?",
    a: "You can pay with Cash on Delivery or a card at checkout. This is a portfolio demo, so card payment is a mock/test flow — no real transaction is ever made.",
  },
  {
    q: "Can I use a coupon code?",
    a: "Yes — enter a code at checkout. Try NIBBLR50, WELCOME10, or FREESHIP.",
  },
  {
    q: "Do you support pure-veg filtering?",
    a: "Yes — use the 'Pure Veg' filter on the home page, or the 'Veg only' toggle on a restaurant's menu page.",
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <button
        className="w-full flex justify-between items-center text-left font-semibold text-ink"
        onClick={() => setOpen((v) => !v)}
      >
        {q}
        <span
          className={`text-brand font-bold transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-gray-500 pt-3">{a}</p>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10 animate-[fadeIn_0.3s_ease-in-out]">
      <h1 className="text-3xl font-extrabold text-ink mb-2 text-center">
        Contact <span className="text-brand">Us</span>
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Have a question or feedback? Reach out, we'd love to hear from you.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-ink">📧 Email</p>
          <p className="text-sm text-gray-500">support@nibblr.app</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-ink">📞 Phone</p>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-ink">📍 Address</p>
          <p className="text-sm text-gray-500">
            Sarwate, Indore, Madhya Pradesh, India
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-ink">🕘 Support Hours</p>
          <p className="text-sm text-gray-500">Everyday, 9 AM - 11 PM</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-ink mb-3">Send a message</h2>
      {submitted ? (
        <div className="bg-[#e8f5e9] text-[#1a7a3a] rounded-xl p-4 text-center font-medium mb-10">
          Thanks for reaching out! We'll get back to you soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-3 mb-10"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          <textarea
            name="message"
            required
            placeholder="Your message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none"
          />
          <button
            type="submit"
            className="self-start px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark active:scale-95 transition-all"
          >
            Send Message
          </button>
        </form>
      )}

      <h2 className="text-xl font-bold text-ink mb-3">
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map((faq) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  );
};
export default Contact;
