# AGENTS.md

JP Optical storefront: single-package Next.js 16 (App Router) + React 19 + strict TypeScript. No backend, database, auth, tests, or ESLint.

## Commands

- `npm install` then `npm run dev` (Next dev server)
- `npm run lint` is the only verification step; it runs `tsc --noEmit`, not ESLint.
- `npm run build` / `npm start` for production.
- There is no test suite. Do not invent test commands.

## Architecture

- `app/` routes: `/` (home), `/collections/[collection]` (sunglasses|optical), `/products/[slug]`, `/about`, `/help`.
- Server page files only validate params (`notFound()`) and render a `"use client"` component (`collection-client.tsx`, `product-detail-client.tsx`). Keep this split when adding routes that need cart/state.
- `app/catalog.ts` is the canonical product catalog (`products`, `collectionDetails`, `getProductBySlug`). Collection and product pages read from it; product pages are statically generated from its slugs via `generateStaticParams`.
- `app/page.tsx` does NOT use `catalog.ts`. It has its own inline `products` array with `home-*` slugs and separate hero/category data. Product edits may need changes in both places.
- `app/about/page.tsx` and `app/help/page.tsx` are hardcoded client pages with their own header markup/icons; they do not use `StoreHeader` or the cart hook, and show a static bag count.

## Cart and checkout

- Cart state lives in `app/components/store-cart.tsx` (`useBag`), persisted to `localStorage` key `jp-optical-bag`.
- Cross-component sync uses a custom window event `jp-optical-bag-updated`; keep dispatching it from any new cart mutation.
- Checkout is front-end only: submitting the form clears the bag and shows a request-confirmation state. No payment or API call exists.

## Styling

- No CSS modules/Tailwind. All styles are global in `app/globals.css`.
- `tokens.css` and `base.css` live at the repo root and are imported from `app/globals.css` via `@import url("../tokens.css")` / `"../base.css"`. Do not move them into `app/` without fixing those paths.
- Prefer existing tokens (`--space-*`, `--text-*`, `--color-*`) over new hard-coded values.
- `app/globals.css` starts with Hallmark design-system header comments and `.hallmark/salt` holds design metadata. Leave these intact unless intentionally regenerating the design.

## Assets

- Images live in `public/` and `public/products/`; many filenames contain spaces or mixed case.
- Some catalog entries reference root paths (e.g. `/Luxury Gold Aviator Sunglasses.png`) while a copy also exists under `/products/`. Reference the exact path used in code when adding assets.
- `next.config.mjs` disables agent rules and pins Turbopack root to `process.cwd()`; do not remove without checking the build.

## Conventions

- Mark files `"use client"` when they use hooks, events, or browser APIs. Existing pages are client components by design.
- Next 16 route params are async: `await params` before use.
- Keep prices as both formatted `price` strings (`₹…`) and numeric `priceValue`; sorting/filtering and cart math use `priceValue`.
