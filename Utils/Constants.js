export const ImageUrl =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/";

export const BRAND_NAME = "Nibblr";
export const BRAND_TAGLINE = "order food you'll love";

// Default map center used whenever the visitor hasn't picked a delivery
// location yet (same coordinates the restaurant-list/menu APIs were already
// hardcoded to before location picking existed).
export const DEFAULT_COORDS = {
  lat: 22.671406264655456,
  lng: 75.87452753433992,
};

//restraunt detail menu

export const resDetailsUrl =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.671406264655456&lng=75.87452753433992&restaurantId=";

// export const resDetailsUrl2 = "&catalog_qa=undefined&submitAction=ENTER";

// Billing/checkout constants — kept in one place so Cart.jsx and
// Checkout.jsx (and Utils/pricing.js) always agree on the numbers.
export const DELIVERY_FEE = 25; // ₹, waived above FREE_DELIVERY_THRESHOLD or with a FREESHIP coupon
export const FREE_DELIVERY_THRESHOLD = 499; // ₹ item total
export const PLATFORM_FEE = 4; // ₹, flat
export const GST_RATE = 0.05; // 5%, applied on (item total - discount)
