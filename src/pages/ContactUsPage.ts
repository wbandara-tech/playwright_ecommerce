import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import path from 'path';

export class ContactUsPage extends BasePage {
  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadFileInput: Locator;
  readonly submitBtn: Locator;
  readonly successMsg: Locator;
  readonly homeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.getInTouchHeading = page.locator('h2:has-text("Get In Touch")');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitBtn = page.locator('input[data-qa="submit-button"]');
    this.successMsg = page.locator('.alert-success');
    this.homeBtn = page.locator('.btn-success:has-text("Home"), a:has-text("Home")').first();
  }

  async verifyContactUsPage() { await expect(this.getInTouchHeading).toBeVisible(); }

  async fillContactForm(data: { name: string; email: string; subject: string; message: string }) {
    await this.fillInput(this.nameInput, data.name);
    await this.fillInput(this.emailInput, data.email);
    await this.fillInput(this.subjectInput, data.subject);
    await this.fillInput(this.messageInput, data.message);
  }

  async uploadFile(filePath?: string) {
    const file = filePath || path.resolve(__dirname, '..', 'data', 'upload-sample.txt');
    await this.uploadFileInput.setInputFiles(file);
  }

  async submitForm() {
    this.page.once('dialog', async (dialog) => { await dialog.accept(); });
    await this.submitBtn.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMsg).toContainText('Success! Your details have been submitted successfully.');
  }

  async clickHome() { await this.homeBtn.click(); }
}
