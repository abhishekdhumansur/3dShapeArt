# Repo Overview

## Summary

This repository is the official website codebase for **3D Shape Art**, a Bangalore-based custom 3D printing business.

The current primary experience is a **business-focused landing page** with:

- premium homepage design
- real product/gallery images
- SEO metadata and structured data
- WhatsApp and email inquiry flow
- sections for products, gallery, trust, reviews, and services

The repo still also contains an older storefront/demo flow under `/products`, `/cart`, and `/checkout`.

## Current architecture

### Main live-style business experience

- `src/app/page.tsx`
  Renders the homepage and injects JSON-LD structured data.
- `src/components/OfficialHomePage.tsx`
  Contains the current main website design.
- `src/app/layout.tsx`
  Defines:
  - brand metadata
  - canonical URL
  - Open Graph tags
  - Twitter tags
  - robots metadata
  - global fonts
- `src/app/robots.ts`
  Generates `robots.txt`
- `src/app/sitemap.ts`
  Generates `sitemap.xml`

### Older storefront/demo flow

- `src/app/products/page.tsx`
- `src/app/products/[id]/page.tsx`
- `src/app/cart/page.tsx`
- `src/app/checkout/page.tsx`
- `src/components/Cart.tsx`
- `src/components/ProductCard.tsx`
- `src/lib/store.ts`
- `src/data/products.ts`

This flow still exists, but it is visually and structurally separate from the current homepage.

## Homepage structure

The current homepage in `src/components/OfficialHomePage.tsx` includes:

- sticky business header with navigation
- hero section with two featured product images
- product/category showcase
- `College project or personal project` placeholder service section
- trust/why-us section
- real work gallery
- highlighted best work images:
  - `ourProduct2.jpg`
  - `ourProduct4.jpg`
- moving testimonial/review section
- contact and inquiry form
- footer

## SEO work currently in place

### Metadata

`src/app/layout.tsx` now includes:

- business-focused page title template
- business description
- target keywords
- canonical URL
- Open Graph data
- Twitter card data
- robots directives

### Structured data

`src/app/page.tsx` includes JSON-LD for:

- `Organization`
- `LocalBusiness`
- `Service`

### Crawl/index support

- `src/app/robots.ts`
- `src/app/sitemap.ts`

## Image/content direction

The homepage now uses real files from `public/` instead of the earlier placeholder-heavy direction.

Important image usage now includes:

- `ourProduct2.jpg`
  featured as one of the strongest showcase images
- `ourProduct4.jpg`
  highlighted as best work, but scaled more carefully in the gallery
- multiple `WhatsApp Image ...` files
  used for supporting product and gallery cards

The earlier visiting card image was removed from the active homepage design.

## Fonts and design direction

The site now uses:

- `Manrope`
- `Space Grotesk`
- `Cormorant Garamond`

Visual direction:

- dark premium background
- warm gold highlights
- small blue accent use
- simpler, more official business tone

## Contact/order flow

The current order/contact flow is frontend-first:

- WhatsApp deep links for quick ordering
- EmailJS form submission for inquiries

This works for both:

- online orders
- offline/custom order follow-up

## Public folder notes

`public/` now contains a mix of:

- legacy brand assets like `logo.png` and `favicon.ico`
- product/gallery photos
- newer WhatsApp-exported product images

These newer files are now actively used in the homepage.

## Current gaps / known limitations

### 1. Two parallel product systems still exist

The repo still contains:

- the current official homepage business flow
- the older demo storefront/cart/checkout flow

These are not fully unified yet.

### 2. Backend/API is still mostly placeholder

The `src/app/api/products/*` endpoints are still demo responses and are not a real production backend.

### 3. Checkout is still simulated

The checkout route remains a demo-style flow and does not create real orders or payments.

### 4. Product data is split

Homepage content is curated directly in `OfficialHomePage.tsx`, while the older storefront uses `src/data/products.ts`.

## Best files to edit next

- `src/components/OfficialHomePage.tsx`
  for homepage UI, gallery, reviews, and services
- `src/app/layout.tsx`
  for global SEO and metadata adjustments
- `src/app/page.tsx`
  for structured data changes
- `src/app/sitemap.ts`
  if more routes/pages are added
- `src/data/products.ts`
  if the older storefront flow is still being kept

## Short takeaway

This repo is now closest to:

- an official business website
- a visual product portfolio
- an SEO-ready lead-generation site

with an older demo storefront still present in the codebase.

The next major improvement would be **fully unifying the old storefront flow with the current official homepage design and business content**.
