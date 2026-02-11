import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly contactUsLink: Locator;
  readonly testCasesLink: Locator;
  readonly loggedInUser: Locator;
  readonly homeLink: Locator;
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
  readonly womenCategory: Locator;
  readonly menCategory: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.testCasesLink = page.locator('a[href="/test_cases"]');
    this.loggedInUser = page.locator('a:has-text("Logged in as")');
    this.homeLink = page.locator('a:has-text(" Home")').first();
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
    this.recommendedItemsHeading = page.locator('.recommended_items h2');
    this.womenCategory = page.locator('a[href="#Women"]');
    this.menCategory = page.locator('a[href="#Men"]');
  }

  async goToHomePage() {
    await this.navigateTo('/');
    await this.verifyHomePage();
  }

  async verifyHomePage() {
    await expect(this.page).toHaveURL(/automationexercise\.com/);
    await expect(this.slider).toBeVisible({ timeout: 15000 });
  }

  async clickSignupLogin() { await this.clickElement(this.signupLoginLink); }
  async clickLogout() { await this.clickElement(this.logoutLink); }
  async clickDeleteAccount() { await this.clickElement(this.deleteAccountLink); }
  async clickProducts() { await this.clickElement(this.productsLink); }
  async clickCart() { await this.clickElement(this.cartLink); }
  async clickContactUs() { await this.clickElement(this.contactUsLink); }
  async clickTestCases() { await this.clickElement(this.testCasesLink); }

  async verifyLoggedInAs(username: string) {
    await expect(this.loggedInUser).toContainText(username);
  }

  async verifyUserLoggedIn() {
    await expect(this.loggedInUser).toBeVisible({ timeout: 10000 });
  }

  async subscribeWithEmail(email: string) {
    await this.scrollToBottom();
    await expect(this.subscriptionHeading).toContainText('Subscription', { ignoreCase: true });
    await this.fillInput(this.subscriptionEmailInput, email);
    await this.subscriptionSubmitBtn.click();
  }

  async verifySubscriptionSuccess() {
    await expect(this.subscriptionSuccessMsg).toContainText('You have been successfully subscribed!');
  }

  async clickScrollUpArrow() {
    await this.scrollToBottom();
    await this.scrollUpArrow.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyHeroSectionVisible() {
    const heroText = this.page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first();
    await expect(heroText).toBeVisible({ timeout: 10000 });
  }

  async clickWomenCategory() {
    await this.clickElement(this.womenCategory);
    await this.page.waitForTimeout(500);
  }

  async clickMenCategory() {
    await this.clickElement(this.menCategory);
    await this.page.waitForTimeout(500);
  }

  async clickWomenSubCategory(subCategory: string) {
    await this.clickWomenCategory();
    const subCatLink = this.page.locator(`#Women a:has-text("${subCategory}")`);
    await this.clickElement(subCatLink);
  }

  async clickMenSubCategory(subCategory: string) {
    await this.clickMenCategory();
    const subCatLink = this.page.locator(`#Men a:has-text("${subCategory}")`);
    await this.clickElement(subCatLink);
  }

  async addRecommendedItemToCart() {
    await this.scrollToBottom();
    await expect(this.recommendedItemsHeading).toContainText('Recommended items', { ignoreCase: true });
    const addToCartBtn = this.recommendedItemsSection.locator('.add-to-cart').first();
    await addToCartBtn.click();
  }

  async clickViewProduct(index: number = 0) {
    const viewProductLinks = this.page.locator('.features_items .choose a[href*="/product_details/"]');
    await viewProductLinks.nth(index).click();
  }

  async addProductToCartFromHomepage(productIndex: number = 0) {
    const product = this.page.locator('.features_items .product-image-wrapper').nth(productIndex);
    await product.hover();
    const overlay = this.page.locator('.features_items .product-overlay').nth(productIndex);
    await overlay.locator('.add-to-cart').click();
  }
}
