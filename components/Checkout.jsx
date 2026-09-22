import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../Utils/cartSlice";
import { computeOrderTotals } from "../Utils/pricing";
import { createOrder } from "../Utils/orderService";
import AddressMap from "./AddressMap";
import CouponInput from "./CouponInput";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

const PINCODE_RE = /^\d{6}$/;
const PHONE_RE = /^\d{10}$/;

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  const cartRestaurantId = useSelector((store) => store.cart.restaurantId);
  const savedLocation = useSelector((store) => store.location);

  const [address, setAddress] = useState({
    lat: savedLocation.lat,
    lng: savedLocation.lng,
    label: savedLocation.label || "",
    line1: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [coupon, setCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentValid, setPaymentValid] = useState(true);
  const [placing, setPlacing] = useState(false);

  const totals = computeOrderTotals({ items: cartItems, coupon });

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center px-4">
        <span className="text-5xl">🛒</span>
        <h1 className="text-xl font-bold text-ink">Your cart is empty</h1>
        <p className="text-gray-500">Add items before checking out.</p>
        <Link
          to="/"
          className="mt-2 px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark active:scale-95 transition-all"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  const handleField = (field) => (e) =>
    setAddress({ ...address, [field]: e.target.value });

  const validateAddress = () => {
    const next = {};
    if (!address.line1.trim()) next.line1 = "Enter your address.";
    if (!address.city.trim()) next.city = "Enter your city.";
    if (!PINCODE_RE.test(address.pincode.trim())) next.pincode = "Enter a valid 6-digit pincode.";
    if (!PHONE_RE.test(address.phone.trim())) next.phone = "Enter a valid 10-digit phone number.";
    setAddressErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateAddress() || !paymentValid) return;
    setPlacing(true);
    const order = createOrder(dispatch, {
      items: cartItems,
      restaurantId: cartRestaurantId,
      address,
      coupon,
      totals,
      paymentMethod,
    });
    dispatch(clearCart());
    navigate(`/order/${order.id}`, { replace: true });
  };

  const canPlaceOrder = paymentValid && !placing;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 animate-[fadeIn_0.3s_ease-in-out] flex flex-col gap-4">
      <h1 className="font-bold text-2xl text-ink">Checkout</h1>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="font-bold text-ink mb-3">Delivery address</h2>
        <AddressMap
          value={address.lat ? address : null}
          onSelect={({ lat, lng, label }) =>
            setAddress((prev) => ({ ...prev, lat, lng, label }))
          }
        />
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="House / flat / street"
              value={address.line1}
              onChange={handleField("line1")}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            {addressErrors.line1 && (
              <p className="text-xs text-red-500 mt-1">{addressErrors.line1}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={handleField("city")}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            {addressErrors.city && (
              <p className="text-xs text-red-500 mt-1">{addressErrors.city}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Pincode"
              maxLength={6}
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value.replace(/\D/g, "") })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            {addressErrors.pincode && (
              <p className="text-xs text-red-500 mt-1">{addressErrors.pincode}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Phone number"
              maxLength={10}
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value.replace(/\D/g, "") })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            {addressErrors.phone && (
              <p className="text-xs text-red-500 mt-1">{addressErrors.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="font-bold text-ink mb-3">Coupon</h2>
        <CouponInput
          subtotal={totals.itemTotal}
          appliedCoupon={coupon}
          onApply={setCoupon}
          onRemove={() => setCoupon(null)}
        />
      </div>

      <PaymentMethod
        method={paymentMethod}
        onSelectMethod={setPaymentMethod}
        onValidityChange={setPaymentValid}
      />

      <OrderSummary totals={totals} />

      <button
        onClick={handlePlaceOrder}
        disabled={!canPlaceOrder}
        className="w-full px-5 py-3 bg-brand text-white font-bold rounded-full hover:bg-brand-dark active:scale-95 transition-all disabled:opacity-50 disabled:hover:bg-brand disabled:active:scale-100"
      >
        {placing ? "Placing order…" : `Place Order · ₹${totals.grandTotal.toFixed(2)}`}
      </button>
    </div>
  );
};

export default Checkout;
