import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/UserContext";
import { useSelector } from "react-redux";

const navLinkClass = ({ isActive }) =>
  `hover:text-[#fc8019] transition-colors ${
    isActive ? "text-[#fc8019] font-semibold" : "text-[#3d4152]"
  }`;

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const status = useOnlineStatus();
  const { userInfo } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex justify-between items-center px-6 py-2 shadow-md sticky top-0 bg-white z-50">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-[#fc8019] tracking-tight">
          Swiggy
        </span>
      </Link>

      <div className="flex items-center">
        <ul className="flex items-center p-2 gap-6 text-sm font-medium">
          <li title={status ? "Online" : "Offline"}>
            {status ? "🟢" : "🔴"}
          </li>
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center gap-1 font-semibold ${
                  isActive ? "text-[#fc8019]" : "text-[#3d4152]"
                } hover:text-[#fc8019] transition-colors`
              }
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="bg-[#fc8019] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-[popIn_0.2s_ease-out]">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <button
              className="px-4 py-1.5 rounded-full border-2 border-[#fc8019] text-[#fc8019] font-semibold hover:bg-[#fc8019] hover:text-white transition-colors"
              onClick={() => {
                loginBtn === "Login"
                  ? setLoginBtn("Logout")
                  : setLoginBtn("Login");
              }}
            >
              {loginBtn}
            </button>
          </li>
          {userInfo && (
            <li className="font-bold text-[#3d4152]">{userInfo}</li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
