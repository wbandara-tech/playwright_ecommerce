import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly productsList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly allProducts: Locator;
  readonly brandsSection: Locator;
  readonly brandLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('.features_items .title');
    this.productsList = page.locator('.features_items .col-sm-4');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.locator('.features_items .title:has-text("Searched Products")');
    this.allProducts = page.locator('.features_items .product-image-wrapper');
    this.brandsSection = page.locator('.brands_products');
    this.brandLinks = page.locator('.brands-name li a');
  }

  async goToProducts() { await this.navigateTo('/products'); }

  async verifyProductsPage() {
    await expect(this.pageHeading).toContainText('All Products', { ignoreCase: true });
    await expect(this.productsList.first()).toBeVisible();
  }

  async searchProduct(productName: string) {
    await this.fillInput(this.searchInput, productName);
    await this.searchButton.click();
  }

  async verifySearchedProducts() {
    await expect(this.searchedProductsHeading).toBeVisible();
    const count = await this.allProducts.count();
    expect(count).toBeGreaterThan(0);
  }

  async getProductCount(): Promise<number> { return this.allProducts.count(); }

  async clickViewProduct(index: number = 0) {
    const viewProductLinks = this.page.locator('.features_items .choose a[href*="/product_details/"]');
    await viewProductLinks.nth(index).click();
  }

  async hoverAndAddToCart(index: number) {
    const product = this.allProducts.nth(index);
    await product.hover();
    const overlay = this.page.locator('.features_items .product-overlay').nth(index);
    await overlay.locator('.add-to-cart').click();
  }

  async clickContinueShopping() {
    await this.page.locator('.modal-content button:has-text("Continue Shopping")').click();
  }

  async clickViewCartModal() {
    await this.page.locator('.modal-content a:has-text("View Cart")').click();
  }

  async verifyBrandsVisible() {
    await expect(this.brandsSection).toBeVisible();
    const count = await this.brandLinks.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickBrand(brandName: string) {
    const brand = this.brandLinks.filter({ hasText: brandName }).first();
    await this.clickElement(brand);
  }

  async verifyBrandPage(brandName: string) {
    await expect(this.pageHeading).toContainText(brandName, { ignoreCase: true });
    const count = await this.allProducts.count();
    expect(count).toBeGreaterThan(0);
  }

  async addAllVisibleProductsToCart() {
    const count = await this.allProducts.count();
    for (let i = 0; i < count; i++) {
      await this.hoverAndAddToCart(i);
      if (i < count - 1) { await this.clickContinueShopping(); }
    }
  }
}
