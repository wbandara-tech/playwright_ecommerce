import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface SignupFormData {
  title: 'Mr' | 'Mrs';
  name: string;
  password: string;
  day: string;
  month: string;
  year: string;
  newsletter: boolean;
  specialOffers: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

/**
 * SignupPage - Handles the full registration form after entering name/email.
 */
export class SignupPage extends BasePage {
  readonly accountInfoHeading: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly nameInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountBtn: Locator;

  // Account created page
  readonly accountCreatedHeading: Locator;
  readonly continueBtn: Locator;

  // Account deleted page
  readonly accountDeletedHeading: Locator;
  readonly deleteContinueBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.accountInfoHeading = page.locator('h2:has-text("Enter Account Information"), b:has-text("Enter Account Information")').first();
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.nameInput = page.locator('#name');
    this.passwordInput = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.addressInput = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountBtn = page.locator('button[data-qa="create-account"]');

    this.accountCreatedHeading = page.locator('h2[data-qa="account-created"], b:has-text("Account Created")').first();
    this.continueBtn = page.locator('a[data-qa="continue-button"]').first();

    this.accountDeletedHeading = page.locator('h2[data-qa="account-deleted"], b:has-text("Account Deleted")').first();
    this.deleteContinueBtn = page.locator('a[data-qa="continue-button"]').first();
  }

  /** Verify account information form is visible */
  async verifyAccountInfoVisible() {
    await expect(this.accountInfoHeading).toBeVisible({ timeout: 10000 });
  }

  /** Fill complete signup form */
  async fillSignupForm(data: SignupFormData) {
    await this.verifyAccountInfoVisible();

    // Title
    if (data.title === 'Mr') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }

    // Account info
    await this.fillInput(this.passwordInput, data.password);
    await this.daySelect.selectOption(data.day);
    await this.monthSelect.selectOption(data.month);
    await this.yearSelect.selectOption(data.year);

    // Checkboxes
    if (data.newsletter) await this.newsletterCheckbox.check();
    if (data.specialOffers) await this.specialOffersCheckbox.check();

    // Address info
    await this.fillInput(this.firstNameInput, data.firstName);
    await this.fillInput(this.lastNameInput, data.lastName);
    await this.fillInput(this.companyInput, data.company);
    await this.fillInput(this.addressInput, data.address);
    await this.fillInput(this.address2Input, data.address2);
    await this.countrySelect.selectOption(data.country);
    await this.fillInput(this.stateInput, data.state);
    await this.fillInput(this.cityInput, data.city);
    await this.fillInput(this.zipcodeInput, data.zipcode);
    await this.fillInput(this.mobileNumberInput, data.mobileNumber);
  }

  /** Click Create Account button */
  async clickCreateAccount() {
    await this.createAccountBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.handleAdsConsentPopups();
  }

  /** Verify account created and click continue */
  async verifyAccountCreatedAndContinue() {
    await expect(this.accountCreatedHeading).toBeVisible({ timeout: 10000 });
    await this.continueBtn.click();
    await this.handleAdsConsentPopups();
  }

  /** Verify account deleted and click continue */
  async verifyAccountDeletedAndContinue() {
    await expect(this.accountDeletedHeading).toBeVisible({ timeout: 10000 });
    await this.deleteContinueBtn.click();
    await this.handleAdsConsentPopups();
  }
}
