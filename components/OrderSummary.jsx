// totals: return value of Utils/pricing.js#computeOrderTotals
const Row = ({ label, value, muted }) => (
  <div className={`flex justify-between text-sm ${muted ? "text-gray-500" : "text-ink"}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const OrderSummary = ({ totals }) => {
  const { itemTotal, discount, deliveryFee, platformFee, gst, grandTotal } = totals;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
      <Row label="Item total" value={`₹${itemTotal.toFixed(2)}`} muted />
      {discount > 0 && (
        <Row label="Coupon discount" value={`− ₹${discount.toFixed(2)}`} muted />
      )}
      <Row
        label="Delivery fee"
        value={deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
        muted
      />
      <Row label="Platform fee" value={`₹${platformFee.toFixed(2)}`} muted />
      <Row label="GST (5%)" value={`₹${gst.toFixed(2)}`} muted />
      <div className="flex justify-between items-center pt-2 border-t text-lg font-bold text-ink">
        <span>To Pay</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
