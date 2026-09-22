// Demo coupon table — there's no backend/payment gateway behind this app,
// so coupons are a fixed local list rather than a validated server lookup.
// Kept intentionally small and clearly fake-looking (NIBBLR-prefixed) so it
// doesn't read as a real promo system.

const COUPONS = {
  NIBBLR50: { type: "flat", value: 50, minOrder: 199, label: "₹50 off" },
  WELCOME10: { type: "percent", value: 10, cap: 150, minOrder: 99, label: "10% off, up to ₹150" },
  FREESHIP: { type: "freeDelivery", minOrder: 149, label: "Free delivery" },
};

// subtotal: item total in rupees
export const validateCoupon = (rawCode, subtotal) => {
  const code = (rawCode || "").trim().toUpperCase();
  if (!code) return { valid: false, message: "Enter a coupon code." };

  const coupon = COUPONS[code];
  if (!coupon) {
    return { valid: false, message: "This coupon code isn't valid." };
  }

  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      message: `Add ₹${(coupon.minOrder - subtotal).toFixed(0)} more to use ${code}.`,
    };
  }

  if (coupon.type === "flat") {
    return {
      valid: true,
      code,
      discount: coupon.value,
      freeDelivery: false,
      message: `${code} applied — ${coupon.label}`,
    };
  }

  if (coupon.type === "percent") {
    const discount = Math.min((subtotal * coupon.value) / 100, coupon.cap);
    return {
      valid: true,
      code,
      discount,
      freeDelivery: false,
      message: `${code} applied — ${coupon.label}`,
    };
  }

  // freeDelivery
  return {
    valid: true,
    code,
    discount: 0,
    freeDelivery: true,
    message: `${code} applied — ${coupon.label}`,
  };
};

export const availableCoupons = COUPONS;
