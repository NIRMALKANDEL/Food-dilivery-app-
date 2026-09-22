import { computeOrderTotals } from "../pricing";

const item = (price, quantity) => ({ price, quantity });

describe("computeOrderTotals", () => {
  test("empty cart has zero totals", () => {
    const totals = computeOrderTotals({ items: [] });
    expect(totals).toEqual({
      itemTotal: 0,
      discount: 0,
      deliveryFee: 0,
      platformFee: 0,
      gst: 0,
      grandTotal: 0,
    });
  });

  test("adds delivery fee, platform fee, and GST below the free-delivery threshold", () => {
    // price is in paise, like cartSlice items
    const totals = computeOrderTotals({ items: [item(20000, 1)] }); // ₹200
    expect(totals.itemTotal).toBe(200);
    expect(totals.deliveryFee).toBe(25);
    expect(totals.platformFee).toBe(4);
    expect(totals.gst).toBe(10); // 5% of 200
    expect(totals.grandTotal).toBe(239);
  });

  test("waives delivery fee above the free-delivery threshold", () => {
    const totals = computeOrderTotals({ items: [item(50000, 1)] }); // ₹500
    expect(totals.deliveryFee).toBe(0);
  });

  test("applies a flat-discount coupon and caps it at the item total", () => {
    const totals = computeOrderTotals({
      items: [item(10000, 1)], // ₹100
      coupon: { valid: true, discount: 500, freeDelivery: false },
    });
    expect(totals.discount).toBe(100); // capped, not 500
    expect(totals.gst).toBe(0); // taxable amount is 0 after the cap
  });

  test("a freeDelivery coupon waives delivery fee regardless of item total", () => {
    const totals = computeOrderTotals({
      items: [item(10000, 1)],
      coupon: { valid: true, discount: 0, freeDelivery: true },
    });
    expect(totals.deliveryFee).toBe(0);
  });
});
