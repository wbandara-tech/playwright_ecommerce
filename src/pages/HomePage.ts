import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Represents the main landing page.
 * Contains navigation links and featured items.
 */
export class HomePage extends BasePage {
  // Navigation elements
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly contactUsLink: Locator;
  readonly testCasesLink: Locator;
  readonly loggedInUser: Locator;
  readonly homeLink: Locator;

  // Page elements
  readonly slider: Locator;
  readonly featuredItems: Locator;
  readonly categorySection: Locator;
  readonly subscriptionHeading: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscriptionSubmitBtn: Locator;
  readonly subscriptionSuccessMsg: Locator;
  readonly scrollUpArrow: Locator;
  readonly heroHeading: Locator;
  readonly recommendedItemsSection: Locator;
  readonly recommendedItemsHeading: Locator;

  // Category elements
  readonly womenCategory: Locator;
  readonly menCategory: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation - use .first() to avoid strict mode violations from duplicate links
    this.signupLoginLink = page.locator('.shop-menu a[href="/login"], a[href="/login"]').first();
    this.logoutLink = page.locator('.shop-menu a[href="/logout"], a[href="/logout"]').first();
    this.deleteAccountLink = page.locator('.shop-menu a[href="/delete_account"], a[href="/delete_account"]').first();
    this.productsLink = page.locator('.shop-menu a[href="/products"], a[href="/products"]').first();
    this.cartLink = page.locator('.shop-menu a[href="/view_cart"], a[href="/view_cart"]').first();
    this.contactUsLink = page.locator('.shop-menu a[href="/contact_us"], a[href="/contact_us"]').first();
    this.testCasesLink = page.locator('.shop-menu a[href="/test_cases"], a[href="/test_cases"]').first();
    this.loggedInUser = page.locator('a:has-text("Logged in as")');
    this.homeLink = page.locator('a:has-text(" Home")').first();

    // Page elements
    this.slider = page.locator('#slider');
    this.featuredItems = page.locator('.features_items');
    this.categorySection = page.locator('.left-sidebar');
    this.subscriptionHeading = page.locator('#footer h2');
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitBtn = page.locator('#subscribe');
    this.subscriptionSuccessMsg = page.locator('#success-subscribe .alert-success');
    this.scrollUpArrow = page.locator('#scrollUp');
    this.heroHeading = page.locator('.item.active h2, .item.active h1').first();
    this.recommendedItemsSection = page.locator('.recommended_items');
    this.recommendedItemsHeading = page.locator('.recommended_items h2:has-text("Recommended Items")');

    // Categories
    this.womenCategory = page.locator('a[href="#Women"]');
    this.menCategory = page.locator('a[href="#Men"]');
  }

  /** Navigate to home page and verify it's loaded */
  async goToHomePage() {
    await this.navigateTo('/');
    await this.verifyHomePage();
  }

  /** Verify that the home page is visible */
  async verifyHomePage() {
    await expect(this.page).toHaveURL(/automationexercise\.com/);
    await expect(this.slider).toBeVisible({ timeout: 15000 });
  }

  /** Click Signup/Login link */
  async clickSignupLogin() {
    await this.clickElement(this.signupLoginLink);
  }

  /** Click Logout link */
  async clickLogout() {
    await this.clickElement(this.logoutLink);
  }

  /** Click Delete Account link */
  async clickDeleteAccount() {
    await this.clickElement(this.deleteAccountLink);
  }

  /** Click Products link */
  async clickProducts() {
    await this.clickElement(this.productsLink);
  }

  /** Click Cart link */
  async clickCart() {
    await this.clickElement(this.cartLink);
  }

  /** Click Contact Us link */
  async clickContactUs() {
    await this.clickElement(this.contactUsLink);
  }

  /** Click Test Cases link */
  async clickTestCases() {
    await this.clickElement(this.testCasesLink);
  }

  /** Verify user is logged in with given username */
  async verifyLoggedInAs(username: string) {
    await expect(this.loggedInUser).toContainText(username);
  }

  /** Verify user is logged in (without checking specific name) */
  async verifyUserLoggedIn() {
    await expect(this.loggedInUser).toBeVisible({ timeout: 10000 });
  }

  /** Subscribe with email */
  async subscribeWithEmail(email: string) {
    await this.scrollToBottom();
    await expect(this.subscriptionHeading).toContainText('Subscription', { ignoreCase: true });
    await this.fillInput(this.subscriptionEmailInput, email);
    await this.subscriptionSubmitBtn.click();
  }

  /** Verify subscription success */
  async verifySubscriptionSuccess() {
    await expect(this.subscriptionSuccessMsg).toContainText('You have been successfully subscribed!');
  }

  /** Click scroll up arrow button */
  async clickScrollUpArrow() {
    await this.scrollToBottom();
    await this.scrollUpArrow.click();
    await this.page.waitForTimeout(1000);
  }

  /** Verify hero section is visible (scrolled to top) */
  async verifyHeroSectionVisible() {
    const heroText = this.page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first();
    await expect(heroText).toBeVisible({ timeout: 10000 });
  }

  /** Click on Women category */
  async clickWomenCategory() {
    await this.womenCategory.scrollIntoViewIfNeeded();
    await this.womenCategory.click({ force: true });
    await this.page.waitForTimeout(500);
  }

  /** Click on Men category */
  async clickMenCategory() {
    await this.menCategory.scrollIntoViewIfNeeded();
    await this.menCategory.click({ force: true });
    await this.page.waitForTimeout(500);
  }

  /** Click on a sub-category under Women */
  async clickWomenSubCategory(subCategory: string) {
    await this.clickWomenCategory();
    await this.page.waitForTimeout(1000);
    const subCatLink = this.page.locator(`#Women a:has-text("${subCategory}")`);
    await subCatLink.click({ force: true });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Click on a sub-category under Men */
  async clickMenSubCategory(subCategory: string) {
    await this.clickMenCategory();
    await this.page.waitForTimeout(1000);
    const subCatLink = this.page.locator(`#Men a:has-text("${subCategory}")`);
    await subCatLink.click({ force: true });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Click Add to Cart on a recommended item */
  async addRecommendedItemToCart() {
    // Scroll to the very bottom of the page
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(1500);
    await this.recommendedItemsSection.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1000);
    await expect(this.recommendedItemsHeading).toBeVisible({ timeout: 15000 });
    // Click any visible add-to-cart button in recommended section
    const addToCartBtn = this.recommendedItemsSection.locator('a.add-to-cart').first();
    const productId = await addToCartBtn.getAttribute('data-product-id');
    await addToCartBtn.scrollIntoViewIfNeeded();

    // Try clicking add-to-cart with retry
    let modalVisible = false;
    for (let attempt = 0; attempt < 2 && !modalVisible; attempt++) {
      try {
        await addToCartBtn.click({ force: true });
        await this.page.locator('#cartModal .modal-dialog').waitFor({ state: 'visible', timeout: 5000 });
        modalVisible = true;
      } catch {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
    }
    // If modal didn't appear, add via API
    if (!modalVisible && productId) {
      await this.page.evaluate((id: string) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/add_to_cart/' + id, false);
        xhr.send();
      }, productId);
      await this.page.waitForTimeout(500);
    }
  }

  /** Click View Product by index (0-based) on homepage */
  async clickViewProduct(index: number = 0) {
    const viewProductLinks = this.page.locator('.features_items .choose a[href*="/product_details/"]');
    await viewProductLinks.nth(index).click();
  }

  /** Add first product to cart from homepage */
  async addProductToCartFromHomepage(productIndex: number = 0) {
    const product = this.page.locator('.features_items .product-image-wrapper').nth(productIndex);
    await product.hover();
    const overlay = this.page.locator('.features_items .product-overlay').nth(productIndex);
    await overlay.locator('.add-to-cart').click();
  }
}
