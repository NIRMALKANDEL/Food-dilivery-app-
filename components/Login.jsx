import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../Utils/UserContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    navigate(returnTo, { replace: true });
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const next = {};
    if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(form.email.trim(), form.name.trim());
    navigate(returnTo, { replace: true });
  };

  return (
    <div className="max-w-sm mx-auto p-6 sm:p-10 animate-[fadeIn_0.3s_ease-in-out]">
      <h1 className="text-3xl font-extrabold text-ink mb-2 text-center">
        Welcome back
      </h1>
      <p className="text-gray-500 mb-6 text-center text-sm">
        Sign in to check out and track your orders.
      </p>

      <div className="bg-accent-light text-accent-dark text-xs rounded-lg p-3 mb-6 leading-relaxed">
        This is a portfolio demo with no real backend — signing in just
        starts a local session in your browser. Don't use a real password.
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-3"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name (optional)"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-2 px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark active:scale-95 transition-all"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link to="/" className="text-brand font-medium hover:underline">
          Continue browsing without signing in
        </Link>
      </p>
    </div>
  );
};

export default Login;
