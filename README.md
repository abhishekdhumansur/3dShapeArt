# 3D Shape Art

Next.js storefront and marketing site for a 3D printing brand, built with the App Router, React 19, Tailwind CSS v4, Framer Motion, and Zustand.

## What this repo contains

- A custom animated landing page at `src/app/page.tsx`
- A separate product browsing flow at `src/app/products`
- Cart and checkout flows powered by Zustand in `src/lib/store.ts`
- Static product and promo data in `src/data/products.ts`
- Shared UI and product components in `src/components`

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand
- EmailJS
- Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project notes

- The homepage is currently a large self-contained client component with hardcoded showcase data and direct EmailJS/WhatsApp actions.
- The `/products`, `/cart`, and `/checkout` routes use a different catalog/storefront structure based on `src/data/products.ts`.
- The API routes under `src/app/api/products` are placeholder responses right now.
- Pricing, promo codes, and checkout are demo-style and not connected to a real backend or payment provider.

## Repo guide

See [REPO_OVERVIEW.md](./REPO_OVERVIEW.md) for a fuller walkthrough of the architecture, routes, assets, gaps, and recommended cleanup areas.
