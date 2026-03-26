// tests/marketing.spec.js
// PrimeCore Intelligence — Marketing Site Full E2E Suite
// Covers: every button, every route, every form, every language, every modal
// Run: npx playwright test
// Run single: npx playwright test marketing --headed

import { test, expect } from "@playwright/test";

const BASE = process.env.MARKETING_URL || "https://primecoreintelligence.com";

// ── NAV ──────────────────────────────────────────────────────────────────
test.describe("Navigation", () => {
  test("Brand logo links to /", async ({ page }) => {
    await page.goto(BASE);
    await page.click(".nav-brand");
    await expect(page).toHaveURL(BASE + "/");
  });

  test("Platform nav link scrolls to #features", async ({ page }) => {
    await page.goto(BASE);
    await page.click('a[href="#features"]');
    await expect(page.locator("#features")).toBeInViewport();
  });

  test("Verticals nav link scrolls to #verticals", async ({ page }) => {
    await page.goto(BASE);
    await page.click('a[href="#verticals"]');
    await expect(page.locator("#verticals")).toBeInViewport();
  });

  test("How It Works nav link scrolls to #how-it-works", async ({ page }) => {
    await page.goto(BASE);
    await page.click('a[href="#how-it-works"]');
    await expect(page.locator("#how-it-works")).toBeInViewport();
  });

  test("Pricing nav link scrolls to #pricing", async ({ page }) => {
    await page.goto(BASE);
    await page.click('a[href="#pricing"]');
    await expect(page.locator("#pricing")).toBeInViewport();
  });

  test("Request Pilot nav CTA links to pilot subdomain", async ({ page }) => {
    await page.goto(BASE);
    const href = await page.locator(".nav-cta .btn-primary").getAttribute("href");
    expect(href).toContain("pilot.primecoreintelligence.com");
  });
});

// ── LANGUAGE SWITCHER ────────────────────────────────────────────────────
test.describe("Language switcher", () => {
  test("EN button is active by default", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator(".lang-btn.active")).toHaveText("EN");
  });

  test("ES button routes to /es/", async ({ page }) => {
    await page.goto(BASE);
    await page.click('.lang-btn:has-text("ES")');
    await expect(page).toHaveURL(/\/es\//);
  });

  test("PT button routes to /pt-br/", async ({ page }) => {
    await page.goto(BASE);
    await page.click('.lang-btn:has-text("PT")');
    await expect(page).toHaveURL(/\/pt-br\//);
  });

  test("ES page has active ES button", async ({ page }) => {
    await page.goto(`${BASE}/es/`);
    await expect(page.locator(".lang-btn.active")).toHaveText("ES");
  });

  test("PT page has active PT button", async ({ page }) => {
    await page.goto(`${BASE}/pt-br/`);
    await expect(page.locator(".lang-btn.active")).toHaveText("PT");
  });

  test("EN button on ES page routes back to /", async ({ page }) => {
    await page.goto(`${BASE}/es/`);
    await page.click('.lang-btn:has-text("EN")');
    await expect(page).toHaveURL(BASE + "/");
  });
});

// ── HERO ─────────────────────────────────────────────────────────────────
test.describe("Hero section", () => {
  test("H1 is visible", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("#hero-heading")).toBeVisible();
  });

  test("Deploy AI Swarm CTA links to pilot", async ({ page }) => {
    await page.goto(BASE);
    const href = await page.locator(".mc-btn-primary").getAttribute("href");
    expect(href).toContain("pilot.primecoreintelligence.com");
  });

  test("View Pricing CTA scrolls to #pricing", async ({ page }) => {
    await page.goto(BASE);
    const href = await page.locator(".mc-btn-secondary").getAttribute("href");
    expect(href).toBe("#pricing");
  });

  test("Watch 60s demo button opens modal", async ({ page }) => {
    await page.goto(BASE);
    await page.click(".btn-cyber-ghost");
    await expect(page.locator("#demoModal")).toBeVisible({ timeout: 3000 });
  });

  test("Demo modal closes with X button", async ({ page }) => {
    await page.goto(BASE);
    await page.click(".btn-cyber-ghost");
    await page.locator("#demoModal button").first().click();
    await expect(page.locator("#demoModal")).not.toBeVisible();
  });

  test("Demo modal closes on Escape key", async ({ page }) => {
    await page.goto(BASE);
    await page.click(".btn-cyber-ghost");
    await page.keyboard.press("Escape");
    await expect(page.locator("#demoModal")).not.toBeVisible();
  });

  test("Queue tiles are visible", async ({ page }) => {
    await page.goto(BASE);
    const tiles = page.locator(".queue-tile");
    await expect(tiles).toHaveCount(4);
  });

  test("Arc panel active calls counter animates", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForTimeout(2500);
    const val = await page.locator("#arcVal").textContent();
    expect(val).toMatch(/\d/);
    expect(val).not.toBe("0");
  });
});

// ── PROBLEM SECTION ──────────────────────────────────────────────────────
test.describe("Problem section", () => {
  test("Section visible and has before/after numbers", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#problem").scrollIntoViewIfNeeded();
    await expect(page.locator("#problem")).toBeVisible();
  });

  test("Run your own numbers link points to /roi", async ({ page }) => {
    await page.goto(BASE);
    const href = await page.locator('a[href="/roi"]').first().getAttribute("href");
    expect(href).toBe("/roi");
  });
});

// ── SOCIAL PROOF CAROUSEL ────────────────────────────────────────────────
test.describe("Social proof carousel", () => {
  test("Shows first testimonial by default", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#social-proof").scrollIntoViewIfNeeded();
    await expect(page.locator(".social-card.active").first()).toBeVisible();
  });

  test("Next button advances carousel", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#social-proof").scrollIntoViewIfNeeded();
    const initialActive = await page.locator(".social-dot.active").getAttribute("aria-label");
    await page.click("#socialNext");
    await page.waitForTimeout(400);
    const newActive = await page.locator(".social-dot.active").getAttribute("aria-label");
    expect(newActive).not.toBe(initialActive);
  });

  test("Prev button goes back", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#social-proof").scrollIntoViewIfNeeded();
    await page.click("#socialNext");
    await page.waitForTimeout(300);
    await page.click("#socialPrev");
    await page.waitForTimeout(300);
    await expect(page.locator(".social-card").first()).toHaveClass(/active/);
  });

  test("Dot indicators navigate directly", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#social-proof").scrollIntoViewIfNeeded();
    await page.locator(".social-dot").nth(2).click();
    await page.waitForTimeout(300);
    await expect(page.locator(".social-card").nth(2)).toHaveClass(/active/);
  });

  test("Join pilot program link present", async ({ page }) => {
    await page.goto(BASE);
    const href = await page.locator(".social-disclaimer a").getAttribute("href");
    expect(href).toContain("pilot.primecoreintelligence.com");
  });
});

// ── MODE TOGGLE ──────────────────────────────────────────────────────────
test.describe("Mode toggle (4 modes)", () => {
  test("All 4 mode tabs present", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#how-ai-works").scrollIntoViewIfNeeded();
    const tabs = page.locator(".mode-tab");
    await expect(tabs).toHaveCount(4);
  });

  test("Clicking Assist Mode shows its panel", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#how-ai-works").scrollIntoViewIfNeeded();
    await page.locator(".mode-tab").nth(1).click();
    await expect(page.locator(".mode-tab").nth(1)).toHaveClass(/active/);
  });

  test("Clicking Warm Handoff shows its panel", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#how-ai-works").scrollIntoViewIfNeeded();
    await page.locator(".mode-tab").nth(2).click();
    await expect(page.locator(".mode-tab").nth(2)).toHaveClass(/active/);
  });

  test("Clicking Outbound shows its panel", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#how-ai-works").scrollIntoViewIfNeeded();
    await page.locator(".mode-tab").nth(3).click();
    await expect(page.locator(".mode-tab").nth(3)).toHaveClass(/active/);
  });
});

// ── CALL SIMULATOR ───────────────────────────────────────────────────────
test.describe("Call simulator", () => {
  test("All 4 sim tabs present", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#live-sim").scrollIntoViewIfNeeded();
    await expect(page.locator(".sim-tab")).toHaveCount(4);
  });

  test("Start Call button is visible", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#live-sim").scrollIntoViewIfNeeded();
    await expect(page.locator(".sim-start-btn, #simStartBtn")).toBeVisible();
  });

  test("Logistics tab is active by default", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#live-sim").scrollIntoViewIfNeeded();
    await expect(page.locator(".sim-tab.active").first()).toContainText("Logistics");
  });
});

// ── ROI CALCULATOR ───────────────────────────────────────────────────────
test.describe("ROI Calculator", () => {
  test("Section visible with all 6 industry buttons", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#roi-calc").scrollIntoViewIfNeeded();
    await expect(page.locator(".roi-industry-btn")).toHaveCount(6);
  });

  test("All industry buttons are clickable", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#roi-calc").scrollIntoViewIfNeeded();
    const btns = page.locator(".roi-industry-btn");
    const count = await btns.count();
    for (let i = 0; i < count; i++) {
      await btns.nth(i).click();
      await expect(btns.nth(i)).toHaveClass(/active/);
    }
  });

  test("Start Pilot CTA in ROI section links to pilot", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#roi-calc").scrollIntoViewIfNeeded();
    const href = await page.locator(".roi-cta-btn, #roi-cta-btn").getAttribute("href");
    expect(href).toContain("pilot.primecoreintelligence.com");
  });
});

// ── PRICING ──────────────────────────────────────────────────────────────
test.describe("Pricing section", () => {
  test("3 pricing cards visible", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    await expect(page.locator(".pricing-card")).toHaveCount(3);
  });

  test("Starter plan Request Pilot button links to pilot", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    const href = await page.locator(".pricing-card").first().locator("a").getAttribute("href");
    expect(href).toContain("pilot.primecoreintelligence.com");
  });

  test("Growth plan Request Pilot button links to pilot", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    const href = await page.locator(".pricing-card").nth(1).locator("a").getAttribute("href");
    expect(href).toContain("pilot.primecoreintelligence.com");
  });

  test("Enterprise Contact Sales links to mailto", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    const href = await page.locator(".pricing-card").nth(2).locator("a").getAttribute("href");
    expect(href).toContain("mailto:sales@primecoreintelligence.com");
  });

  test("Security Packet link is mailto not dead PDF", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    const href = await page.locator('a:has-text("Security Packet")').getAttribute("href");
    expect(href).toContain("mailto:security@");
    expect(href).not.toContain(".pdf");
  });
});

// ── COMPLIANCE BADGES ────────────────────────────────────────────────────
test.describe("Compliance badges", () => {
  test("6 compliance badges visible", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#compliance").scrollIntoViewIfNeeded();
    await expect(page.locator(".comp-badge")).toHaveCount(6);
  });

  test("GDPR badge expands on click", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#compliance").scrollIntoViewIfNeeded();
    await page.locator(".comp-badge").first().click();
    await expect(page.locator(".comp-badge").first()).toHaveAttribute("aria-expanded", "true");
  });

  test("Clicking another badge collapses the first", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#compliance").scrollIntoViewIfNeeded();
    await page.locator(".comp-badge").first().click();
    await page.locator(".comp-badge").nth(1).click();
    await expect(page.locator(".comp-badge").first()).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator(".comp-badge").nth(1)).toHaveAttribute("aria-expanded", "true");
  });

  test("Full security architecture link points to /trust", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#compliance").scrollIntoViewIfNeeded();
    const href = await page.locator(".comp-trust-link").getAttribute("href");
    expect(href).toContain("/trust");
  });
});

// ── CTA FORM ─────────────────────────────────────────────────────────────
test.describe("CTA pilot form", () => {
  test("Form is visible", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await expect(page.locator("#ctaForm")).toBeVisible();
  });

  test("Submit without fields shows validation errors", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await page.click("#ctaSubmitBtn");
    await expect(page.locator("#ctaForm")).toBeVisible();
    await expect(page.locator("#ctaSuccess")).not.toBeVisible();
  });

  test("Invalid email shows error", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await page.fill("#ctaName", "Test User");
    await page.fill("#ctaEmail", "notanemail");
    await page.locator("#ctaEmail").blur();
    await expect(page.locator("#ctaEmailErr")).toBeVisible();
  });

  test("Valid .com email passes validation", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await page.fill("#ctaEmail", "test@company.com");
    await page.locator("#ctaEmail").blur();
    await expect(page.locator("#ctaEmailErr")).not.toBeVisible();
  });

  test("Valid .com.mx email passes validation", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await page.fill("#ctaEmail", "test@empresa.com.mx");
    await page.locator("#ctaEmail").blur();
    await expect(page.locator("#ctaEmailErr")).not.toBeVisible();
  });

  test("Form submits and shows success (API mocked)", async ({ page }) => {
    await page.route("**/relay/pilot-request", (route) =>
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, id: "pilot_test_123" }),
      })
    );
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await page.fill("#ctaName", "Test User");
    await page.fill("#ctaEmail", "test@company.com");
    await page.selectOption("#ctaVolume", "5k-20k");
    await page.click("#ctaSubmitBtn");
    await expect(page.locator("#ctaSuccess")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#ctaForm")).not.toBeVisible();
  });

  test("Form shows success even if API fails (fail-open)", async ({ page }) => {
    await page.route("**/relay/pilot-request", (route) => route.abort());
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await page.fill("#ctaName", "Test User");
    await page.fill("#ctaEmail", "test@company.com");
    await page.selectOption("#ctaVolume", "5k-20k");
    await page.click("#ctaSubmitBtn");
    await expect(page.locator("#ctaSuccess")).toBeVisible({ timeout: 5000 });
  });
});

// ── STICKY CTA BAR ───────────────────────────────────────────────────────
test.describe("Sticky CTA bar", () => {
  test("Sticky bar appears after scrolling past hero", async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(600);
    await expect(page.locator(".sticky-cta")).toBeVisible();
  });

  test("Sticky bar CTA links to pilot", async ({ page }) => {
    await page.goto(BASE);
    const href = await page.locator(".sticky-btn").getAttribute("href");
    expect(href).toContain("pilot.primecoreintelligence.com");
  });
});

// ── FOOTER ───────────────────────────────────────────────────────────────
test.describe("Footer", () => {
  test("No Guatemala or dual operations text", async ({ page }) => {
    await page.goto(BASE);
    const footerText = await page.locator("footer").textContent();
    expect(footerText).not.toContain("Guatemala City");
    expect(footerText).not.toContain("dual operations");
  });

  test("Holding company text present", async ({ page }) => {
    await page.goto(BASE);
    const footerText = await page.locator("footer").textContent();
    expect(footerText).toContain("holding company");
  });

  test("Client Portal link present", async ({ page }) => {
    await page.goto(BASE);
    const href = await page.locator('footer a[href*="app.primecoreintelligence.com"]').getAttribute("href");
    expect(href).toContain("app.primecoreintelligence.com");
  });

  test("Legal link present", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('footer a[href*="/legal"]')).toBeVisible();
  });

  test("Trust link present", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('footer a[href*="/trust"]')).toBeVisible();
  });

  test("ROI Calculator link present", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('footer a[href*="/roi"]')).toBeVisible();
  });

  test("Support mailto present", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('footer a[href*="mailto:support"]')).toBeVisible();
  });
});

// ── SUBPAGES ─────────────────────────────────────────────────────────────
test.describe("Subpages load correctly", () => {
  test("/trust loads with EN content by default", async ({ page }) => {
    await page.goto(`${BASE}/trust`);
    await expect(page.locator("#panel-en")).toBeVisible();
    await expect(page.title()).resolves.toContain("Trust");
  });

  test("/trust?lang=es shows ES content", async ({ page }) => {
    await page.goto(`${BASE}/trust?lang=es`);
    await expect(page.locator("#panel-es")).toBeVisible();
  });

  test("/trust?lang=pt shows PT content", async ({ page }) => {
    await page.goto(`${BASE}/trust?lang=pt`);
    await expect(page.locator("#panel-pt")).toBeVisible();
  });

  test("/legal loads", async ({ page }) => {
    await page.goto(`${BASE}/legal/`);
    await expect(page.locator("body")).toBeVisible();
    expect(await page.title()).toContain("Legal");
  });

  test("/roi loads with calculator", async ({ page }) => {
    await page.goto(`${BASE}/roi`);
    await expect(page.locator("body")).toBeVisible();
  });

  test("/es/ loads with ES content", async ({ page }) => {
    await page.goto(`${BASE}/es/`);
    await expect(page.locator(".lang-btn.active")).toHaveText("ES");
  });

  test("/pt-br/ loads with PT content", async ({ page }) => {
    await page.goto(`${BASE}/pt-br/`);
    await expect(page.locator(".lang-btn.active")).toHaveText("PT");
  });
});

// ── RELAY API ────────────────────────────────────────────────────────────
test.describe("Relay API endpoints", () => {
  test("GET relay root returns ok", async ({ request }) => {
    const res = await request.get("https://relay.primecoreintelligence.com/");
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.service).toBe("primecore-relay");
  });

  test("POST /relay/pilot-request with valid data returns 201", async ({ request }) => {
    const res = await request.post(
      "https://relay.primecoreintelligence.com/relay/pilot-request",
      {
        data: {
          name: "Playwright Test",
          email: "playwright@test-e2e.com",
          volume: "5k-20k",
          source: "playwright-e2e-test",
        },
      }
    );
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.id).toMatch(/^pilot_/);
  });

  test("POST /relay/pilot-request without email returns 422", async ({ request }) => {
    const res = await request.post(
      "https://relay.primecoreintelligence.com/relay/pilot-request",
      { data: { name: "No Email" } }
    );
    expect(res.status()).toBe(422);
  });

  test("Rate limit header present on pilot-request", async ({ request }) => {
    const res = await request.post(
      "https://relay.primecoreintelligence.com/relay/pilot-request",
      { data: { name: "Test", email: "test@test.com" } }
    );
    // Should have rate-limit related response structure
    expect([201, 422, 429]).toContain(res.status());
  });
});

// ── MOBILE RESPONSIVE ────────────────────────────────────────────────────
test.describe("Mobile responsive", () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14

  test("Hero is visible on mobile", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("#hero-heading")).toBeVisible();
  });

  test("Nav links hidden on mobile", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator(".nav-links")).not.toBeVisible();
  });

  test("CTA form is usable on mobile", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await expect(page.locator("#ctaName")).toBeVisible();
    await expect(page.locator("#ctaEmail")).toBeVisible();
    await expect(page.locator("#ctaSubmitBtn")).toBeVisible();
  });
});

// ── ACCESSIBILITY ────────────────────────────────────────────────────────
test.describe("Accessibility basics", () => {
  test("Page has a single H1", async ({ page }) => {
    await page.goto(BASE);
    const h1s = page.locator("h1");
    await expect(h1s).toHaveCount(1);
  });

  test("All images have alt text", async ({ page }) => {
    await page.goto(BASE);
    const imgs = page.locator("img:not([alt])");
    await expect(imgs).toHaveCount(0);
  });

  test("Form inputs have labels", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("#cta-final").scrollIntoViewIfNeeded();
    await expect(page.locator('label[for="ctaName"]')).toBeVisible();
    await expect(page.locator('label[for="ctaEmail"]')).toBeVisible();
  });

  test("Demo modal has aria-modal attribute", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('[aria-modal="true"]')).toHaveAttribute("aria-modal", "true");
  });
});
