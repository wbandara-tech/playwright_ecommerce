import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Handles login and signup entry forms.
 */
export class LoginPage extends BasePage {
  // Login form
  readonly loginHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMsg: Locator;

  // Signup form
  readonly signupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMsg: Locator;

  constructor(page: Page) {
    super(page);

    // Login form elements
    this.loginHeading = page.locator('.login-form h2');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMsg = page.locator('.login-form p[style*="color: red"]');

    // Signup form elements
    this.signupHeading = page.locator('.signup-form h2');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMsg = page.locator('.signup-form p[style*="color: red"]');
  }

  /** Verify login page is loaded */
  async verifyLoginPage() {
    await expect(this.loginHeading).toContainText('Login to your account');
    await expect(this.signupHeading).toContainText('New User Signup!');
  }

  /** Login with email and password */
  async login(email: string, password: string) {
    await this.fillInput(this.loginEmailInput, email);
    await this.fillInput(this.loginPasswordInput, password);
    try {
      await this.loginButton.click({ timeout: 10000 });
    } catch {
      await this.loginButton.click({ force: true, timeout: 5000 }).catch(() => {
        this.loginButton.evaluate((el: HTMLElement) => el.click());
      });
    }
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
  }

  /** Verify login error message */
  async verifyLoginError() {
    await expect(this.loginErrorMsg).toContainText('Your email or password is incorrect!');
  }

  /** Enter signup details and click signup */
  async enterSignupDetails(name: string, email: string) {
    await expect(this.signupHeading).toContainText('New User Signup!');
    await this.fillInput(this.signupNameInput, name);
    await this.fillInput(this.signupEmailInput, email);
    try {
      await this.signupButton.click({ timeout: 10000 });
    } catch {
      // Fallback: force click or JS click if button is intercepted by overlay
      try {
        await this.signupButton.click({ force: true, timeout: 5000 });
      } catch {
        await this.signupButton.evaluate((el: HTMLElement) => el.click());
      }
    }
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
  }

  /** Verify signup error for existing email */
  async verifySignupError() {
    await expect(this.signupErrorMsg).toContainText('Email Address already exist!');
  }
}
