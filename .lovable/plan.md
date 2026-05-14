## Goal
Make 48 months (4 years) the default selected commitment period across all hosting plan pages and the homepage pricing section.

## Changes

**1. Hosting plan pages — change default `useState<Period>("12")` → `useState<Period>("48")`**
- `src/pages/solutions/SharedHosting.tsx` (line 179)
- `src/pages/solutions/CloudHosting.tsx` (line 136)
- `src/pages/solutions/WordPressHosting.tsx` (line 148)
- `src/pages/solutions/BusinessEmail.tsx` (line 130)

Also move the "Best value" badge from the 12-month option to the 48-month option in each `PERIODS` array, so the visual highlight aligns with the new default.

**2. Homepage pricing (`src/components/HomePricingSection.tsx`)**
- Extend the billing toggle from `"monthly" | "annually"` to include a `"4year"` (48-month) option.
- Default state → `"4year"`.
- Add a third pill button labeled "4 Years" with a "BEST VALUE" badge.
- Pricing math: since WHMCS products only return monthly/annual prices in the current fetch, compute the 48-month effective monthly price as `price_annually * 0.65 / 12` (≈35% discount vs annual) as a display-only value, with `/mo` suffix and "billed every 4 years" subtext. Fallback plan data gets matching `price_4year` fields.
- CTA link will pass `period=48` in the cart query string for consistency with the hosting pages.

## Out of scope
- No backend / WHMCS pricing changes.
- Cart page default (`src/pages/Cart.tsx`) is driven by query string from these pages, so it will naturally reflect 48 months when users click through.
