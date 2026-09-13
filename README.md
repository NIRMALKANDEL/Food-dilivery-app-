# 🍔 Swiggy Clone - React Application

A front-end Swiggy clone built using **React**, **Redux Toolkit**, and **Tailwind CSS**. It replicates the core ordering flow of a food-delivery app — browsing restaurants, viewing menus, and managing a cart — with real API data and a resilient fallback when Swiggy's servers can't be reached.

---

## 🛠️ Getting Started

```bash
npm install
npm start      # runs the dev server (Parcel) at http://localhost:1234
npm run build  # production build, output in dist/
npm test       # runs the Jest test suite
```

> **Note on the Swiggy API:** Swiggy's public API sends no CORS headers for
> browser requests, and its menu endpoint runs bot-detection that blocks most
> proxy traffic. `Utils/api.js` tries a direct fetch first, then falls back
> through a couple of CORS proxies. If every live attempt fails, the app
> falls back to bundled sample data (`Utils/mockData.js`) so the UI is never
> stuck — a small banner tells you when you're looking at sample data.

---

## 🚀 Features

- **Restaurant discovery** — live restaurant list with search, and combinable filters (rating, pure veg, fast delivery, sort by rating).
- **Restaurant menus** — handles both of Swiggy's real menu shapes (flat categories and nested sub-categories), with a top-picks carousel and a veg-only toggle.
- **Cart, powered by Redux Toolkit** — add/remove quantities from anywhere in the app, a running subtotal + delivery fee + total, and the cart persists across page reloads via `localStorage`.
- **Routing** — React Router with a home page, restaurant menu pages, cart, about, and contact pages; smooth scroll-to-top and fade transitions on navigation (including browser back/forward).
- **Loading & error states** — shimmer skeletons while data loads, an offline banner, and a router error boundary.
- **Responsive, themed UI** — Tailwind CSS styled to match Swiggy's look and feel, with subtle hover/press animations throughout.

---

## 🌐 Technologies Used

- **React 18** — UI components and application logic.
- **React Router DOM** — client-side routing.
- **Redux Toolkit** — cart state management.
- **Tailwind CSS** — utility-first styling.
- **Parcel** — zero-config bundler for dev and production builds.

---

## 🚢 Deploying

The app is a static single-page app after `npm run build` (output in `dist/`). Since it uses client-side routing, the host needs to serve `index.html` for every path.

**Vercel** — a `vercel.json` is already included (build command, output directory, and SPA rewrite). Just import the repo in Vercel and deploy.

**Netlify** — a `netlify.toml` is already included with the build command, publish directory, and SPA redirect. Import the repo in Netlify and deploy.

**Any other static host** (GitHub Pages, Cloudflare Pages, S3 + CloudFront, etc.) — run `npm run build`, upload the contents of `dist/`, and configure the host to fall back to `index.html` for unknown paths (a 404 → `/index.html` rewrite).

---

## 🤝 Contribution

This project was created as a learning exercise. Feel free to explore, fork, and enhance it — suggestions and improvements are always welcome.

---

## 🌟 Acknowledgments

- Inspired by [Swiggy](https://www.swiggy.com/) for its intuitive design and functionality.
- React community and online resources for providing valuable tutorials and examples.
