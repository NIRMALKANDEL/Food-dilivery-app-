import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import { useAuth } from "../Utils/UserContext";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import LocationPicker from "./LocationPicker";

const navLinkClass = ({ isActive }) =>
  `hover:text-brand transition-colors ${
    isActive ? "text-brand font-semibold" : "text-ink"
  }`;

const NavLinks = ({ onNavigate }) => (
  <>
    <li>
      <NavLink to="/" className={navLinkClass} onClick={onNavigate}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/about" className={navLinkClass} onClick={onNavigate}>
        About
      </NavLink>
    </li>
    <li>
      <NavLink to="/contact" className={navLinkClass} onClick={onNavigate}>
        Contact Us
      </NavLink>
    </li>
    <li>
      <NavLink to="/favorites" className={navLinkClass} onClick={onNavigate}>
        Favorites
      </NavLink>
    </li>
    <li>
      <NavLink to="/orders" className={navLinkClass} onClick={onNavigate}>
        Orders
      </NavLink>
    </li>
  </>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = useOnlineStatus();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const CartLink = ({ onNavigate }) => (
    <NavLink
      to="/cart"
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-1 font-semibold ${
          isActive ? "text-brand" : "text-ink"
        } hover:text-brand transition-colors`
      }
    >
      🛒 Cart
      {cartCount > 0 && (
        <span className="bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-[popIn_0.2s_ease-out]">
          {cartCount}
        </span>
      )}
    </NavLink>
  );

  const AuthAction = ({ onNavigate }) =>
    isAuthenticated ? (
      <div className="flex items-center gap-3">
        <span className="font-semibold text-ink text-sm hidden lg:inline">
          Hi, {user.name}
        </span>
        <button
          className="px-4 py-1.5 rounded-full border-2 border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-colors"
          onClick={() => {
            handleLogout();
            onNavigate?.();
          }}
        >
          Logout
        </button>
      </div>
    ) : (
      <Link
        to="/login"
        onClick={onNavigate}
        className="px-4 py-1.5 rounded-full border-2 border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-colors"
      >
        Login
      </Link>
    );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-4 sm:px-6 py-2">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="hidden sm:block">
          <LocationPicker />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center p-2 gap-6 text-sm font-medium">
            <li title={status ? "Online" : "Offline"}>
              {status ? "🟢" : "🔴"}
            </li>
            <NavLinks />
            <li>
              <CartLink />
            </li>
            <li>
              <AuthAction />
            </li>
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl text-ink"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className="px-4 pb-2 sm:hidden">
        <LocationPicker />
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 pb-4 pt-2 animate-[fadeIn_0.2s_ease-in-out]">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <NavLinks onNavigate={() => setMenuOpen(false)} />
            <li>
              <CartLink onNavigate={() => setMenuOpen(false)} />
            </li>
            <li className="pt-2">
              <AuthAction onNavigate={() => setMenuOpen(false)} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Header;
