import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectOrders } from "../Utils/orderService";
import { addItem } from "../Utils/cartSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        dispatch(addItem({ ...item, restaurantId: order.restaurantId }));
      }
    });
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center px-4">
        <span className="text-5xl">📦</span>
        <h1 className="text-xl font-bold text-ink">No orders yet</h1>
        <p className="text-gray-500">Your placed orders will show up here.</p>
        <Link
          to="/"
          className="mt-2 px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark active:scale-95 transition-all"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 animate-[fadeIn_0.3s_ease-in-out] flex flex-col gap-4">
      <h1 className="font-bold text-2xl text-ink">Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm font-semibold text-ink">
                {order.items.map((i) => i.name).join(", ")}
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#e8f5e9] text-[#1a7a3a] capitalize shrink-0">
              {order.status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-ink">
              ₹{order.totals.grandTotal.toFixed(2)}
            </p>
            <div className="flex gap-3">
              <Link
                to={`/order/${order.id}`}
                className="text-sm font-semibold text-brand hover:underline"
              >
                Details
              </Link>
              <button
                onClick={() => handleReorder(order)}
                className="text-sm font-semibold text-brand hover:underline"
              >
                Reorder
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
