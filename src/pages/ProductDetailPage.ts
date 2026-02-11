import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly viewCartLink: Locator;
  readonly writeReviewHeading: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextarea: Locator;
  readonly reviewSubmitBtn: Locator;
  readonly reviewSuccessMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p:has-text("Category")');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p:has-text("Availability")');
    this.productCondition = page.locator('.product-information p:has-text("Condition")');
    this.productBrand = page.locator('.product-information p:has-text("Brand")');
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.locator('button.cart');
    this.viewCartLink = page.locator('.modal-content a:has-text("View Cart")');
    this.writeReviewHeading = page.locator('a:has-text("Write Your Review")');
    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextarea = page.locator('#review');
    this.reviewSubmitBtn = page.locator('#button-review');
    this.reviewSuccessMsg = page.locator('.alert-success span');
  }

  async verifyProductDetails() {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async getProductName(): Promise<string> { return (await this.productName.textContent()) || ''; }
  async getProductPrice(): Promise<string> { return (await this.productPrice.textContent()) || ''; }

  async setQuantity(quantity: number) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async clickAddToCart() { await this.addToCartBtn.click(); }
  async clickViewCart() { await this.viewCartLink.click(); }

  async submitReview(name: string, email: string, review: string) {
    await expect(this.writeReviewHeading).toBeVisible();
    await this.fillInput(this.reviewNameInput, name);
    await this.fillInput(this.reviewEmailInput, email);
    await this.fillInput(this.reviewTextarea, review);
    await this.reviewSubmitBtn.click();
  }

  async verifyReviewSuccess() {
    await expect(this.reviewSuccessMsg).toContainText('Thank you for your review.');
  }
}
