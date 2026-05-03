# Repo Overview

## Summary

This repository is a Next.js 16 application for **3D Shape Art**, a 3D printing and personalized products brand.

The codebase currently contains **two overlapping product experiences**:

1. A custom, animated, single-page marketing homepage in `src/app/page.tsx`
2. A more traditional storefront flow using `/products`, `/cart`, and `/checkout`

That split is the main architectural detail to understand before making further changes.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand for cart state
- EmailJS for inquiry submission
- Lucide React icons
- Radix UI and shadcn/ui primitives in `src/components/ui`
- Three.js dependencies are installed, but the current homepage is the dominant experience

## Main folders

### `src/app`

- `layout.tsx`
  Sets global metadata, icons, and the root page shell.
- `page.tsx`
  Main homepage and the biggest single file in the repo. It includes:
  - hero section
  - product showcase
  - portfolio/gallery
  - YouTube shorts section
  - contact section
  - booking modal
  - EmailJS and WhatsApp submission logic
- `products/page.tsx`
  Catalog page with category filter and sort options.
- `products/[id]/page.tsx`
  Product detail page with add-to-cart flow and related products.
- `cart/page.tsx`
  Wrapper page that renders the cart component.
- `checkout/page.tsx`
  Demo checkout flow with shipping/payment steps and simulated order completion.
- `api/products/*`
  Placeholder API routes. These do not currently provide real product, cart, or checkout behavior.

### `src/components`

- `Cart.tsx`
  Renders cart items, promo code handling, totals, and checkout CTA.
- `ProductCard.tsx`
  Storefront product card with image, pricing, rating, and add-to-cart action.
- `ProductGrid.tsx`
  Featured products grid based on `src/data/products.ts`.
- Other components such as `Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `ThreeScene.tsx`, and promo sections exist, but the current homepage is mostly implemented directly inside `src/app/page.tsx`.
- `ui/*`
  Reusable UI primitives generated in the shadcn style.

### `src/data`

- `products.ts`
  Static product catalog and promo-code data for the storefront pages.

### `src/lib`

- `types.ts`
  Core types for products, cart items, promo codes, orders, and addresses.
- `store.ts`
  Zustand cart store with subtotal, discount, and total helpers.
- `utils.ts`
  Utility helpers like class merging, price formatting, discount calculation, and order ID generation.

### `public`

- Product photos and brand assets such as `logo.png`, `favicon.ico`, and multiple `photo*.jpg` files.

## Route map

- `/`
  Brand-heavy animated landing page
- `/products`
  Product listing page
- `/products/[id]`
  Product detail page
- `/cart`
  Shopping cart
- `/checkout`
  Checkout experience
- `/api/products`
  Placeholder endpoint
- `/api/products/cart`
  Placeholder endpoint
- `/api/products/checkout`
  Placeholder endpoint

## State and data flow

### Homepage flow

The homepage does **not** use the shared product catalog in `src/data/products.ts`.

Instead, it defines local arrays such as:

- `bestProducts`
- `producedProducts`
- `youtubeShorts`
- `testimonials`

The booking modal on the homepage:

- sends email inquiries through EmailJS for email mode
- opens WhatsApp with a prefilled message for WhatsApp mode

### Storefront flow

The storefront pages use:

- `src/data/products.ts` for product data
- `src/lib/store.ts` for cart state
- `src/components/ProductCard.tsx` and `src/components/Cart.tsx` for interaction

This means the landing page catalog and the storefront catalog are currently **separate systems**.

## Important current-state observations

### 1. The README was outdated

The original `README.md` was still the default Create Next App template and did not describe the real project.

### 2. The homepage is monolithic

`src/app/page.tsx` is very large and contains:

- data
- UI sections
- modal state
- form state
- contact behavior
- animation config

It works as the main brand experience, but it will be harder to maintain than the smaller component-based structure used elsewhere.

### 3. There are two visual systems

The homepage uses a cyan/blue-on-black look, while the storefront components lean more purple/pink and use shared classes like `card`, `btn-primary`, and `glass-effect`.

That suggests the project has evolved in two directions and has not yet been unified.

### 4. API routes are placeholders

The files in `src/app/api/products`, `src/app/api/products/cart`, and `src/app/api/products/checkout` currently return simple JSON messages and are not wired into the UI.

### 5. The checkout is simulated

`src/app/checkout/page.tsx` simulates payment with a timeout and does not persist orders or call a real payments backend.

### 6. Promo data is stale

`src/data/products.ts` includes promo codes with 2024 and early-2025 expiry dates, which are now out of date relative to the current repo date.

### 7. Some text encoding appears broken

There are several mojibake-style characters in `src/app/page.tsx` and comments in `layout.tsx`, which usually means some emoji or special characters were saved with the wrong encoding at some point.

### 8. Git status could not be read safely in this environment

The repo currently triggers Git's "dubious ownership" safe-directory warning in this workspace, so Git-based verification was limited during this pass.

## Configuration notes

- `next.config.ts`
  Allows remote images from `images.unsplash.com` and `placeholder.com`
- `components.json`
  Confirms shadcn-style aliases and Tailwind/globals paths
- `tailwind.config.mjs`
  Contains a basic content scan setup
- `globals.css`
  Is minimal and mainly sets the black theme and a small animation utility set

## What looks safe to improve next

### High-value cleanup

- Break `src/app/page.tsx` into smaller section components
- Unify the homepage product data with `src/data/products.ts`, or intentionally keep them separate and document why
- Replace placeholder API routes with real handlers or remove them until needed
- Refresh expired promo codes
- Normalize the visual design system across homepage and storefront
- Fix the broken character encoding in visible text/comments

### If this becomes production-ready

- Move product data to a database or CMS
- Add server-side order creation
- Integrate a real payment provider
- Validate booking/contact inputs on the server
- Store EmailJS/public IDs in environment variables where possible
- Add tests for store logic and route behavior

## Best entry points for future work

- Start with `src/app/page.tsx` if the goal is homepage or brand/UI work
- Start with `src/data/products.ts`, `src/lib/store.ts`, and `src/components/ProductCard.tsx` if the goal is e-commerce/catalog work
- Start with `src/app/layout.tsx` and `src/app/globals.css` if the goal is global branding or metadata updates

## Short takeaway

This repo is already a strong visual prototype with a working frontend flow, but it is currently a blend of:

- a custom marketing microsite
- a demo storefront
- placeholder backend routes

The next major improvement should be **unifying those pieces into one consistent product architecture**.
