import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, removeItem, deleteItem, clearCart } from "../Utils/cartSlice";
import { ImageUrl } from "../Utils/Constants";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price / 100) * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? 25 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-2xl text-[#3d4152]">
          Your Cart {itemCount > 0 && `(${itemCount})`}
        </h1>
        {cartItems.length > 0 && (
          <button
            className="px-4 py-2 bg-[#3d4152] text-white rounded-lg font-medium hover:bg-black active:scale-95 transition-all"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">🛒</span>
          <h1 className="text-xl font-bold text-[#3d4152]">
            Your cart is empty
          </h1>
          <p className="text-gray-500">
            You can go to home page to view more restaurants
          </p>
          <Link
            to="/"
            className="mt-2 px-5 py-2 bg-[#fc8019] text-white font-semibold rounded-full hover:bg-[#e0721a] active:scale-95 transition-all"
          >
            See Restaurants Near You
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 border-gray-100 border-b last:border-b-0 flex items-center justify-between gap-3"
              >
                <img
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                  src={ImageUrl + item.imageId}
                  alt={item.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#3d4152] truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price / 100} x {item.quantity} = ₹
                    {((item.price / 100) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-[#fc8019] text-white font-bold rounded-lg px-3 py-1">
                  <button
                    className="active:scale-90 transition-transform"
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label="Remove one"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="active:scale-90 transition-transform"
                    onClick={() => dispatch(addItem(item))}
                    aria-label="Add one more"
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors text-lg"
                  onClick={() => dispatch(deleteItem(item.id))}
                  aria-label="Remove item"
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md mt-4 p-4 space-y-2">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Item total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Delivery fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t text-lg font-bold text-[#3d4152]">
              <span>To Pay</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
