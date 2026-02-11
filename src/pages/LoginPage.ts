import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMsg: Locator;
  readonly signupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.loginHeading = page.locator('.login-form h2');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMsg = page.locator('.login-form p[style*="color: red"]');
    this.signupHeading = page.locator('.signup-form h2');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMsg = page.locator('.signup-form p[style*="color: red"]');
  }

  async verifyLoginPage() {
    await expect(this.loginHeading).toContainText('Login to your account');
    await expect(this.signupHeading).toContainText('New User Signup!');
  }

  async login(email: string, password: string) {
    await this.fillInput(this.loginEmailInput, email);
    await this.fillInput(this.loginPasswordInput, password);
    await this.loginButton.click();
  }

  async verifyLoginError() {
    await expect(this.loginErrorMsg).toContainText('Your email or password is incorrect!');
  }

  async enterSignupDetails(name: string, email: string) {
    await expect(this.signupHeading).toContainText('New User Signup!');
    await this.fillInput(this.signupNameInput, name);
    await this.fillInput(this.signupEmailInput, email);
    await this.signupButton.click();
  }

  async verifySignupError() {
    await expect(this.signupErrorMsg).toContainText('Email Address already exist!');
  }
}
