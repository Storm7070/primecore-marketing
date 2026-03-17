# PrimeCore Intelligence — Marketing Site

Public marketing site for PrimeCore Intelligence.

**Live:** `https://primecoreintelligence.com`

Cloudflare Pages static site. No build step — deploy `public/` directly.

---

## Structure

```
public/
  index.html              — EN homepage (hero, features, verticals, pricing, CTA)
  es/
    index.html            — ES homepage (full Spanish translation)
    precios/index.html    — ES pricing page
  en/
    pricing/index.html    — EN pricing (redirects to /#pricing)
  pt-br/
    precos/index.html     — PT-BR pricing (redirects to ES for now)
  assets/
    PrimeCore_LATAM_Enterprise_Pack_v1_3.pdf
  sitemap.xml
  robots.txt
  _redirects              — Cloudflare Pages routing
  _headers                — Security headers
```

---

## SEO

- `hreflang` EN / ES / PT / x-default on all pages
- `og:image` → `/assets/og-card.png` (create a 1200×630 branded PNG)
- JSON-LD: `Organization` + `SoftwareApplication` schemas
- Plausible analytics (privacy-first, no cookies, GDPR compliant)
- `sitemap.xml` with multilingual URLs

---

## Languages

| Path | Language | Status |
|------|----------|--------|
| `/` | English | ✅ Full |
| `/es/` | Spanish | ✅ Full |
| `/pt-br/` | Portuguese (BR) | 🔜 Redirect to ES |

---

## Pricing Tiers

| Plan | Price | Calls |
|------|-------|-------|
| Starter | $2,400/mo | up to 5,000 |
| Growth | $5,800/mo | up to 20,000 |
| Enterprise | Custom | Unlimited |

Pilot Month 1 is 50% off on Starter and Growth.

---

## Action Required: og:image

Create `/public/assets/og-card.png` (1200×630px) with:
- PrimeCore Intelligence wordmark
- Tagline: "Every call. Zero SLA breaches."
- Dark background `#040812`, accent `#2d7aff`

---

## Disclaimer

Not legal, medical, financial, or compliance advice.
© 2026 PrimeCore Intelligence S.A.
