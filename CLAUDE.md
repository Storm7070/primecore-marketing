# PrimeCore Intelligence — Marketing Site

`primecoreintelligence.com` — Cloudflare Pages

## Site Structure
```
public/
  index.html          — EN homepage (hero, features, verticals, pricing, footer)
  es/index.html       — ES homepage (full translation)
  pt-br/index.html    — PT-BR homepage (full translation)
  trust/index.html    — Trust & Security page (enterprise procurement)
  roi/index.html      — ROI calculator (6 industries, 3 sliders, live results)
  legal/index.html    — Legal docs EN/ES/PT (Terms, Privacy, SLA, DPA, AI Disclosure)
  en/pricing/         — EN pricing page
  es/precios/         — ES pricing page
  pt-br/precos/       — PT-BR pricing page
  .well-known/security.txt
  assets/             — og-card.png MISSING (1200×630 needed)
  sitemap.xml
  _redirects
  _headers
  robots.txt
```

## Language System
All pages: EN/ES/PT with `?lang=` URL param, localStorage, browser detect.
hreflang declared on all pages. Plausible analytics on all pages.

## Pricing (canonical — never change without updating billing too)
- Starter: $2,400/mo (≤5k calls) — Pilot Month 1: $1,200
- Professional: $5,800/mo (≤20k calls) — Pilot Month 1: $2,900
- Enterprise: $7,997/mo (unlimited) — Pilot Month 1: $3,999

## Design System
See War Room CLAUDE.md for tokens. Fonts: Syne + DM Sans.

## Outstanding Gap
`/public/assets/og-card.png` — 1200×630 branded OG card — MISSING
og:image confirmed 1200x630 at /public/assets/og-card.png — all pages updated.

## MCP Guidance
- `--c7` for Cloudflare Pages `_redirects` / `_headers` / sitemap format
- `playwright` for multilingual smoke tests (lang switcher, form submit, ROI calc)
- `magic` for og:image generation
