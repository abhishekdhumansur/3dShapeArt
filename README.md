# 3D Shape Art

Official business website for a Bangalore-based custom 3D printing brand, built with Next.js App Router, React 19, Tailwind CSS v4, Framer Motion, Zustand, and EmailJS.

## Current focus

- Premium business-style homepage in `src/app/page.tsx`
- SEO-oriented metadata, structured data, sitemap, and robots setup
- Product showcase using real images from `public`
- WhatsApp and email inquiry flow for online and offline orders

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand
- EmailJS
- Lucide React

## Main website experience

- `src/app/page.tsx`
  Homepage entry with JSON-LD structured data
- `src/components/OfficialHomePage.tsx`
  Main business landing page UI
- `src/app/layout.tsx`
  Global fonts, SEO metadata, Open Graph, Twitter, robots metadata
- `src/app/robots.ts`
  Crawl rules
- `src/app/sitemap.ts`
  Sitemap generation

## Other routes still in repo

- `/products`
- `/products/[id]`
- `/cart`
- `/checkout`

These still exist as a separate storefront/demo flow and are not yet fully unified with the current homepage design.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- The homepage now uses real business/product images rather than placeholder content.
- SEO is configured for a custom 3D printing business in Bangalore with online and offline ordering.
- The contact flow is currently powered by EmailJS and WhatsApp deep links.
- API routes under `src/app/api/products` are still placeholder/demo responses.

## Repo guide

See [REPO_OVERVIEW.md](./REPO_OVERVIEW.md) for the fuller architecture and current-state summary.
