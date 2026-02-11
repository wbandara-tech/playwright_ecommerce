import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import path from 'path';

/**
 * ContactUsPage - Handles contact form submission.
 */
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

  /** Verify Contact Us page */
  async verifyContactUsPage() {
    await expect(this.getInTouchHeading).toBeVisible();
  }

  /** Fill contact form */
  async fillContactForm(data: { name: string; email: string; subject: string; message: string }) {
    await this.fillInput(this.nameInput, data.name);
    await this.fillInput(this.emailInput, data.email);
    await this.fillInput(this.subjectInput, data.subject);
    await this.fillInput(this.messageInput, data.message);
  }

  /** Upload a file */
  async uploadFile(filePath?: string) {
    const file = filePath || path.resolve(__dirname, '..', 'data', 'upload-sample.txt');
    await this.uploadFileInput.setInputFiles(file);
  }

  /** Submit the form - handle dialog */
  async submitForm() {
    // The site's jQuery submit handler calls confirm() then sets success HTML client-side.
    // Override confirm, trigger submit, and poll until success text appears - all in one call.
    await this.page.waitForFunction(
      () => {
        const jq = (window as any).jQuery;
        if (!jq) return false;
        // Ensure confirm is overridden
        (window as any).confirm = () => true;
        // Trigger the form's jQuery submit handler
        jq('#contact-us-form').trigger('submit');
        // Check if success text was set
        const el = document.querySelector('.alert-success');
        return el && el.textContent && el.textContent.includes('Success');
      },
      { timeout: 20000, polling: 500 }
    );
  }

  /** Verify success message */
  async verifySuccessMessage() {
    // The jQuery handler sets .alert-success innerHTML to "Success! Your details have been submitted successfully."
    // and display: block. Check that the element has the success text.
    const msg = this.page.locator('.status.alert.alert-success').first();
    await expect(msg).toContainText('success', { ignoreCase: true, timeout: 10000 });
  }

  /** Click Home button */
  async clickHome() {
    await this.homeBtn.click();
  }
}
