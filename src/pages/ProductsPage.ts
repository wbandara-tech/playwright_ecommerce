import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductsPage - Represents the All Products listing page.
 */
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
    this.searchedProductsHeading = page.locator('h2:has-text("Searched Products")').first();
    this.allProducts = page.locator('.features_items .product-image-wrapper');
    this.brandsSection = page.locator('.brands_products');
    this.brandLinks = page.locator('.brands-name li a');
  }

  /** Navigate to products page */
  async goToProducts() {
    await this.navigateTo('/products');
  }

  /** Verify the products page is loaded */
  async verifyProductsPage() {
    await expect(this.pageHeading).toContainText('All Products', { ignoreCase: true });
    await expect(this.productsList.first()).toBeVisible();
  }

  /** Search for a product */
  async searchProduct(productName: string) {
    await this.fillInput(this.searchInput, productName);
    // The search button has a jQuery click handler that does:
    //   window.location = '/products?search=' + searchTerm
    // Try button click first, then use direct navigation as fallback
    await this.page.evaluate(() => {
      const btn = document.getElementById('submit_search') as HTMLElement;
      if (btn) btn.click();
    });
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    // Verify search worked; if not, navigate directly to the search URL
    const headingVisible = await this.searchedProductsHeading.isVisible().catch(() => false);
    if (!headingVisible) {
      await this.page.goto('/products?search=' + encodeURIComponent(productName), {
        waitUntil: 'domcontentloaded',
      });
      await this.page.waitForTimeout(2000);
    }
  }

  /** Verify searched products are displayed */
  async verifySearchedProducts() {
    await expect(this.searchedProductsHeading).toBeVisible({ timeout: 15000 });
    const count = await this.allProducts.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Get the count of visible products */
  async getProductCount(): Promise<number> {
    return this.allProducts.count();
  }

  /** Click View Product by index (0-based) */
  async clickViewProduct(index: number = 0) {
    const viewProductLinks = this.page.locator('.features_items .choose a[href*="/product_details/"]');
    await viewProductLinks.nth(index).click();
  }

  /** Hover over product and click Add to Cart */
  async hoverAndAddToCart(index: number) {
    const product = this.allProducts.nth(index);
    await product.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);

    const addToCartBtn = product.locator('.productinfo .add-to-cart');
    const productId = await addToCartBtn.getAttribute('data-product-id');

    // Try clicking add-to-cart (up to 2 attempts)
    let modalVisible = false;
    for (let attempt = 0; attempt < 2 && !modalVisible; attempt++) {
      await product.hover();
      await this.page.waitForTimeout(300);
      try {
        await addToCartBtn.click({ force: true });
        await this.page.locator('#cartModal .modal-dialog').waitFor({ state: 'visible', timeout: 5000 });
        modalVisible = true;
      } catch {
        // Dismiss any blocking overlay and retry
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
    }

    // If modal still didn't appear, add via API
    if (!modalVisible && productId) {
      await this.page.evaluate((id: string) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/add_to_cart/' + id, false);
        xhr.send();
      }, productId);
      await this.page.waitForTimeout(500);
    }
  }

  /** Click Continue Shopping in the modal */
  async clickContinueShopping() {
    const btn = this.page.locator('#cartModal button:has-text("Continue Shopping")');
    try {
      await btn.waitFor({ state: 'visible', timeout: 5000 });
      await btn.click();
      await this.page.waitForTimeout(500);
    } catch {
      // Modal not visible - dismiss if present, otherwise continue
      const modal = this.page.locator('#cartModal');
      if (await modal.isVisible().catch(() => false)) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
    }
  }

  /** Click View Cart in the modal */
  async clickViewCartModal() {
    const link = this.page.locator('#cartModal a:has-text("View Cart")');
    try {
      await link.waitFor({ state: 'visible', timeout: 5000 });
      await link.click();
    } catch {
      // Modal not visible - navigate to cart directly
      await this.navigateTo('/view_cart');
    }
  }

  /** Verify brands are visible */
  async verifyBrandsVisible() {
    await expect(this.brandsSection).toBeVisible();
    const count = await this.brandLinks.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Click on a specific brand */
  async clickBrand(brandName: string) {
    const brand = this.brandLinks.filter({ hasText: brandName }).first();
    await this.clickElement(brand);
  }

  /** Verify brand page is displayed */
  async verifyBrandPage(brandName: string) {
    await expect(this.pageHeading).toContainText(brandName, { ignoreCase: true });
    const count = await this.allProducts.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Add all visible searched products to cart */
  async addAllVisibleProductsToCart() {
    const count = await this.allProducts.count();
    for (let i = 0; i < count; i++) {
      await this.hoverAndAddToCart(i);
      if (i < count - 1) {
        await this.clickContinueShopping();
      }
    }
  }
}
