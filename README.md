# 🍽️ Nibblr

A portfolio-ready food-delivery web app built with **React 18**, **Redux Toolkit**, **React Router**, and **Tailwind CSS**. It covers the full ordering flow — discovering restaurants, browsing menus, managing a cart, checking out with an address map and coupons, and tracking order history — backed by real restaurant data with a resilient offline-friendly fallback.

---

## 🛠️ Getting Started

```bash
npm install
npm start      # runs the dev server (Parcel) at http://localhost:1234
npm run build  # production build, output in dist/
npm test       # runs the Jest test suite
```

> **Note on live restaurant data:** the app fetches restaurant/menu data
> directly from Swiggy's public API. That API sends no CORS headers for
> browser requests and its menu endpoint runs bot-detection that blocks most
> proxy traffic. `Utils/api.js` tries a direct fetch first, then falls back
> through a couple of CORS proxies. If every live attempt fails, the app
> falls back to bundled sample data (`Utils/mockData.js`) so the UI is never
> stuck — a small banner tells you when you're looking at sample data.

---

## 🚀 Features

- **Restaurant discovery** — search, combinable filters (rating, pure veg, fast delivery), sort by rating or price, dynamic cuisine-chip filters, "Deliver to" location picker (browser geolocation or manual search), recently-viewed and favorites.
- **Restaurant menus** — handles both real menu response shapes (flat categories and nested sub-categories), a top-picks carousel, and a veg-only toggle.
- **Cart** — add/remove/update quantities from anywhere in the app, a live subtotal/fees/total breakdown, an empty-cart state, and persistence across reloads via `localStorage`.
- **Checkout & billing** — delivery address with an interactive Leaflet/OpenStreetMap picker, coupon codes with validation, itemized totals (delivery fee, platform fee, 5% GST), and a mock Cash-on-Delivery/card payment flow.
- **Orders** — order confirmation page, order history, and one-click reorder.
- **Auth** — a simple demo login/logout flow gating checkout, orders, and favorites (see *Demo & security notes* below).
- **Fallbacks everywhere** — shimmer skeletons while loading, an offline banner, a router error boundary, and a dedicated 404 page.
- **Responsive, branded UI** — Tailwind CSS with a custom brand palette, a hamburger nav on mobile, and subtle hover/press animations throughout.

---

## 🌐 Technologies Used

- **React 18** — UI components and application logic.
- **React Router DOM** — client-side routing, including protected routes.
- **Redux Toolkit** — cart, favorites, orders, and location state.
- **Leaflet + OpenStreetMap** — interactive delivery-address map (no API key required).
- **Tailwind CSS** — utility-first styling with a custom brand theme.
- **Parcel** — zero-config bundler for dev and production builds.

---

## 🔒 Demo & security notes

This project has **no backend** — it's a static single-page app. A few things
that would normally live server-side are intentionally simulated client-side,
and are called out plainly rather than dressed up as real:

- **Login/logout** (`Utils/UserContext.jsx`) only does client-side format
  validation of the email/password — there's no server-side credential
  store, so don't use a real password. It just starts a local session
  (`crypto.randomUUID()` token) so checkout/orders/favorites have something
  to gate on.
- **Payment** (`components/PaymentMethod.jsx`) is a mock flow — card details
  are format-validated (Luhn check, expiry, CVV) and then discarded; they're
  never stored in `localStorage`, Redux, or sent anywhere. No real
  transaction is ever made.
- **Orders** are stored locally (Redux + `localStorage`) rather than on a
  server, so they only exist in the browser that placed them.
- All `localStorage` reads/writes are wrapped in `try/catch` so a disabled
  or full storage never crashes the app — state just won't persist across
  reloads in that case.
- No API keys or secrets are used anywhere (Leaflet tiles and Nominatim
  geocoding are both free, keyless services).

---

## 🚢 Deploying

The app is a static single-page app after `npm run build` (output in `dist/`). Since it uses client-side routing, the host needs to serve `index.html` for every path.

**Vercel** — a `vercel.json` is already included (build command, output directory, and SPA rewrite). Just import the repo in Vercel and deploy.

**Netlify** — a `netlify.toml` is already included with the build command, publish directory, and SPA redirect. Import the repo in Netlify and deploy.

**Any other static host** (GitHub Pages, Cloudflare Pages, S3 + CloudFront, etc.) — run `npm run build`, upload the contents of `dist/`, and configure the host to fall back to `index.html` for unknown paths (a 404 → `/index.html` rewrite).

---

## 🤝 Contribution

This project was created as a portfolio/learning exercise. Feel free to explore, fork, and enhance it — suggestions and improvements are always welcome.
