import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class PaymentPage extends BasePage {
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmBtn: Locator;
  readonly orderSuccessMsg: Locator;
  readonly downloadInvoiceBtn: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payAndConfirmBtn = page.locator('button[data-qa="pay-button"]');
    this.orderSuccessMsg = page.locator('#success_message .alert-success, .title:has-text("Order Placed"), p:has-text("Congratulations")');
    this.downloadInvoiceBtn = page.locator('a.btn:has-text("Download Invoice")');
    this.continueBtn = page.locator('a[data-qa="continue-button"]');
  }

  async fillPaymentDetails(payment: PaymentData) {
    await this.fillInput(this.nameOnCardInput, payment.nameOnCard);
    await this.fillInput(this.cardNumberInput, payment.cardNumber);
    await this.fillInput(this.cvcInput, payment.cvc);
    await this.fillInput(this.expiryMonthInput, payment.expiryMonth);
    await this.fillInput(this.expiryYearInput, payment.expiryYear);
  }

  async clickPayAndConfirm() { await this.payAndConfirmBtn.click(); }

  async verifyOrderPlaced() {
    await expect(this.orderSuccessMsg.first()).toBeVisible({ timeout: 10000 });
  }

  async downloadInvoice(): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceBtn.click(),
    ]);
    const filePath = await download.path();
    return filePath || '';
  }

  async clickContinue() {
    await this.continueBtn.click();
    await this.handleAdsConsentPopups();
  }
}
