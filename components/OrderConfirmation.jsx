import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectOrderById } from "../Utils/orderService";
import OrderSummary from "./OrderSummary";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const order = useSelector((store) => selectOrderById(store, orderId));

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center px-4">
        <span className="text-5xl">🔍</span>
        <h1 className="text-xl font-bold text-ink">Order not found</h1>
        <p className="text-gray-500">
          This order doesn't exist in this browser's history.
        </p>
        <Link
          to="/orders"
          className="mt-2 px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark active:scale-95 transition-all"
        >
          View Your Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 animate-[fadeIn_0.3s_ease-in-out] flex flex-col gap-4">
      <div className="text-center py-4">
        <span className="text-5xl">🎉</span>
        <h1 className="text-2xl font-bold text-ink mt-2">Order placed!</h1>
        <p className="text-gray-500 mt-1">
          Arriving in about {order.estimatedDeliveryMins} minutes.
        </p>
        <p className="text-xs text-gray-400 mt-1">Order ID: {order.id}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="font-bold text-ink mb-2">Delivering to</h2>
        <p className="text-sm text-gray-600">
          {order.address.line1}, {order.address.city} - {order.address.pincode}
        </p>
        <p className="text-sm text-gray-500">📞 {order.address.phone}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="p-3 border-gray-100 border-b last:border-b-0 flex justify-between text-sm"
          >
            <span className="text-ink">
              {item.name} × {item.quantity}
            </span>
            <span className="text-gray-500">
              ₹{((item.price / 100) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <OrderSummary totals={order.totals} />

      <div className="flex gap-3">
        <Link
          to="/"
          className="flex-1 text-center px-5 py-2 border-2 border-brand text-brand font-semibold rounded-full hover:bg-brand hover:text-white transition-colors"
        >
          Order More
        </Link>
        <Link
          to="/orders"
          className="flex-1 text-center px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
