// Thin helpers around the `orders` Redux slice (Utils/ordersSlice.jsx).
// There's no backend, so "placing an order" just means building an Order
// record and storing it in Redux (which appStore.jsx then persists to
// localStorage) — but funnelling it through one function keeps the Order
// shape consistent and gives Checkout.jsx a single call to make.

import { addOrder } from "./ordersSlice";

// items: cartSlice items snapshot
// restaurantId: cartSlice.restaurantId at the time of ordering (kept on the
// order so "Reorder" in Orders.jsx can pass it back to cartSlice.addItem)
// address: { label, lat, lng, line1, city, pincode, phone }
// totals: return value of Utils/pricing.js#computeOrderTotals
export const createOrder = (dispatch, { items, restaurantId, address, coupon, totals, paymentMethod }) => {
  const order = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "placed",
    items,
    restaurantId,
    address,
    coupon: coupon?.valid ? { code: coupon.code, discount: totals.discount } : null,
    totals,
    paymentMethod, // "cod" | "card"
    estimatedDeliveryMins: 35 + Math.floor(Math.random() * 20),
  };
  dispatch(addOrder(order));
  return order;
};

export const selectOrders = (state) => state.orders.list;
export const selectOrderById = (state, orderId) =>
  state.orders.list.find((order) => order.id === orderId) || null;
