// Single source of truth for order-total math, shared by Cart.jsx (preview
// totals) and Checkout.jsx (final totals) so the numbers a shopper sees in
// the cart never drift from what they're actually charged at checkout.

import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  PLATFORM_FEE,
  GST_RATE,
} from "./Constants";

// items: cartSlice items, each { price (paise), quantity, ... }
// coupon: result of couponService.validateCoupon (or null/undefined)
export const computeOrderTotals = ({ items = [], coupon = null } = {}) => {
  const itemTotal = items.reduce(
    (sum, item) => sum + (item.price / 100) * item.quantity,
    0
  );

  const discount = itemTotal > 0 ? Math.min(coupon?.discount || 0, itemTotal) : 0;

  const qualifiesForFreeDelivery = itemTotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee =
    itemTotal === 0 || coupon?.freeDelivery || qualifiesForFreeDelivery
      ? 0
      : DELIVERY_FEE;

  const platformFee = itemTotal === 0 ? 0 : PLATFORM_FEE;
  const taxableAmount = Math.max(itemTotal - discount, 0);
  const gst = Math.round(taxableAmount * GST_RATE * 100) / 100;

  const grandTotal =
    Math.round((taxableAmount + deliveryFee + platformFee + gst) * 100) / 100;

  return {
    itemTotal: round2(itemTotal),
    discount: round2(discount),
    deliveryFee: round2(deliveryFee),
    platformFee: round2(platformFee),
    gst: round2(gst),
    grandTotal: round2(grandTotal),
  };
};

const round2 = (n) => Math.round(n * 100) / 100;
