import { useState } from "react";
import { validateCoupon } from "../Utils/couponService";

// subtotal: item total in rupees
// appliedCoupon: validateCoupon() result, or null
const CouponInput = ({ subtotal, appliedCoupon, onApply, onRemove }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  const handleApply = (e) => {
    e.preventDefault();
    const result = validateCoupon(code, subtotal);
    setMessage(result);
    if (result.valid) {
      onApply(result);
      setCode("");
    }
  };

  if (appliedCoupon?.valid) {
    return (
      <div className="flex items-center justify-between bg-[#e8f5e9] text-[#1a7a3a] rounded-lg px-3 py-2 text-sm">
        <span className="font-medium">🎉 {appliedCoupon.message}</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-semibold underline hover:no-underline"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Coupon code (try NIBBLR50)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand uppercase"
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="px-4 py-2 text-sm font-semibold text-brand border border-brand rounded-lg hover:bg-brand hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-brand transition-colors"
        >
          Apply
        </button>
      </div>
      {message && !message.valid && (
        <p className="text-xs text-red-500">{message.message}</p>
      )}
    </form>
  );
};

export default CouponInput;
