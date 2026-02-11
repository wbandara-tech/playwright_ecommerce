import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage - Abstract base class for all Page Objects.
 * Implements common actions and wait strategies following DRY principle.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a specific path relative to baseURL */
  async navigateTo(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.handleAdsConsentPopups();
  }

  /** Handle Google Ads consent/overlay popups that may block interactions */
  async handleAdsConsentPopups() {
    try {
      // Close Google Ads iframe overlay if present
      const adFrames = this.page.frames().filter(f => f.url().includes('google'));
      for (const frame of adFrames) {
        const dismissBtn = frame.locator('[id*="dismiss"], [class*="close"], [aria-label="Close"]');
        if (await dismissBtn.count() > 0) {
          await dismissBtn.first().click({ timeout: 2000 }).catch(() => {});
        }
      }

      // Dismiss any consent dialogs
      const consentBtn = this.page.locator('.fc-cta-consent, .fc-close, #consent-page .fc-button');
      if (await consentBtn.count() > 0) {
        await consentBtn.first().click({ timeout: 3000 }).catch(() => {});
      }
    } catch {
      // Silently handle - ads may not be present
    }
  }

  /** Click element with auto-scroll and retry */
  async clickElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  /** Fill input with clear first */
  async fillInput(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value);
  }

  /** Scroll to the bottom of the page */
  async scrollToBottom() {
    await this.page.evaluate(() => {
      const height = document.body?.scrollHeight || document.documentElement?.scrollHeight || 0;
      window.scrollTo(0, height);
    });
    await this.page.waitForTimeout(500);
  }

  /** Scroll to the top of the page */
  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(500);
  }

  /** Wait for page to load completely */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Verify page URL contains expected path */
  async verifyUrl(expectedPath: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  /** Verify text is visible on the page */
  async verifyTextVisible(text: string) {
    await expect(this.page.getByText(text, { exact: false }).first()).toBeVisible({ timeout: 10000 });
  }

  /** Take a named screenshot */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  /** Get current page title */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
