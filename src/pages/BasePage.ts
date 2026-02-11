import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.handleAdsConsentPopups();
  }

  async handleAdsConsentPopups() {
    try {
      const adFrames = this.page.frames().filter(f => f.url().includes('google'));
      for (const frame of adFrames) {
        const dismissBtn = frame.locator('[id*="dismiss"], [class*="close"], [aria-label="Close"]');
        if (await dismissBtn.count() > 0) {
          await dismissBtn.first().click({ timeout: 2000 }).catch(() => {});
        }
      }
      const consentBtn = this.page.locator('.fc-cta-consent, .fc-close, #consent-page .fc-button');
      if (await consentBtn.count() > 0) {
        await consentBtn.first().click({ timeout: 3000 }).catch(() => {});
      }
    } catch {
      // Silently handle
    }
  }

  async clickElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async fillInput(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value);
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(500);
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(500);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyUrl(expectedPath: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  async verifyTextVisible(text: string) {
    await expect(this.page.getByText(text, { exact: false }).first()).toBeVisible({ timeout: 10000 });
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
