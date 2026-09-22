import { Link } from "react-router-dom";
import Logo from "./Logo";
import { BRAND_NAME } from "../Utils/Constants";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-100 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <Logo />
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Great food, delivered fast. {BRAND_NAME} is a portfolio project —
            a demo food-delivery experience, not a real ordering service.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-ink mb-3 text-sm">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand transition-colors">About</Link></li>
            <li><Link to="/favorites" className="hover:text-brand transition-colors">Favorites</Link></li>
            <li><Link to="/orders" className="hover:text-brand transition-colors">Your Orders</Link></li>
            <li><Link to="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-ink mb-3 text-sm">Find us</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {BRAND_NAME}. Built for demonstration purposes only.
      </div>
    </footer>
  );
};

export default Footer;
