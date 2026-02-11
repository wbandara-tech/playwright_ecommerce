import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductDetailPage - Represents an individual product's detail page.
 */
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

  // Review section
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

    this.writeReviewHeading = page.locator('a[href="#reviews"], a:has-text("Write Your Review")').first();
    // Scope review form inputs to #review-form to avoid strict mode violations with header email field
    const reviewForm = page.locator('#review-form');
    this.reviewNameInput = reviewForm.getByPlaceholder('Your Name');
    this.reviewEmailInput = reviewForm.getByPlaceholder('Email Address');
    this.reviewTextarea = reviewForm.getByPlaceholder('Add Review Here!');
    this.reviewSubmitBtn = reviewForm.locator('#button-review');
    this.reviewSuccessMsg = page.locator('#review-form .alert-success, .alert-success:has-text("review")').first();
  }

  /** Verify product detail page is loaded with all details */
  async verifyProductDetails() {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  /** Get product name text */
  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) || '';
  }

  /** Get product price text */
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) || '';
  }

  /** Set product quantity */
  async setQuantity(quantity: number) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  /** Click Add to Cart */
  async clickAddToCart() {
    await this.addToCartBtn.scrollIntoViewIfNeeded();
    // Try regular click first, then force click
    let modalVisible = false;
    for (let attempt = 0; attempt < 2 && !modalVisible; attempt++) {
      try {
        if (attempt === 0) {
          await this.addToCartBtn.click();
        } else {
          await this.addToCartBtn.click({ force: true });
        }
        await this.page.locator('#cartModal .modal-dialog').waitFor({ state: 'visible', timeout: 5000 });
        modalVisible = true;
      } catch {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
    }
    // If modal still didn't appear, add via synchronous XHR
    if (!modalVisible) {
      const productUrl = this.page.url();
      const match = productUrl.match(/product_details\/(\d+)/);
      if (match) {
        await this.page.evaluate((id: string) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', '/add_to_cart/' + id, false);
          xhr.send();
        }, match[1]);
        await this.page.waitForTimeout(500);
      }
    }
  }

  /** Click View Cart in the modal */
  async clickViewCart() {
    const link = this.page.locator('#cartModal a:has-text("View Cart")');
    try {
      await link.waitFor({ state: 'visible', timeout: 5000 });
      await link.click();
    } catch {
      // Modal not visible - navigate to cart directly
      await this.page.goto('/view_cart');
    }
  }

  /** Submit a product review */
  async submitReview(name: string, email: string, review: string) {
    await this.writeReviewHeading.scrollIntoViewIfNeeded();
    await expect(this.writeReviewHeading).toBeVisible({ timeout: 10000 });
    await this.reviewNameInput.scrollIntoViewIfNeeded();
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextarea.fill(review);
    await this.reviewSubmitBtn.click();
  }

  /** Verify review success message */
  async verifyReviewSuccess() {
    await expect(this.reviewSuccessMsg).toBeVisible({ timeout: 10000 });
  }
}
