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
    a: "This demo focuses on the browsing and ordering flow, so checkout and payment are not wired up yet.",
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
        className="w-full flex justify-between items-center text-left font-semibold text-[#3d4152]"
        onClick={() => setOpen((v) => !v)}
      >
        {q}
        <span
          className={`text-[#fc8019] font-bold transition-transform duration-300 ${
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
      <h1 className="text-3xl font-extrabold text-[#3d4152] mb-2 text-center">
        Contact <span className="text-[#fc8019]">Us</span>
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Have a question or feedback? Reach out, we'd love to hear from you.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-[#3d4152]">📧 Email</p>
          <p className="text-sm text-gray-500">support@swiggyclone.com</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-[#3d4152]">📞 Phone</p>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-[#3d4152]">📍 Address</p>
          <p className="text-sm text-gray-500">
            Sarwate, Indore, Madhya Pradesh, India
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5">
          <p className="font-semibold text-[#3d4152]">🕘 Support Hours</p>
          <p className="text-sm text-gray-500">Everyday, 9 AM - 11 PM</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[#3d4152] mb-3">Send a message</h2>
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc8019] focus:border-[#fc8019]"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc8019] focus:border-[#fc8019]"
          />
          <textarea
            name="message"
            required
            placeholder="Your message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc8019] focus:border-[#fc8019] resize-none"
          />
          <button
            type="submit"
            className="self-start px-5 py-2 bg-[#fc8019] text-white font-semibold rounded-full hover:bg-[#e0721a] active:scale-95 transition-all"
          >
            Send Message
          </button>
        </form>
      )}

      <h2 className="text-xl font-bold text-[#3d4152] mb-3">
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
