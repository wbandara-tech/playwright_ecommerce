import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CartProduct {
  name: string;
  price: string;
  quantity: string;
  total: string;
}

export class CartPage extends BasePage {
  readonly cartInfoTable: Locator;
  readonly cartRows: Locator;
  readonly emptyCartMsg: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly registerLoginLink: Locator;
  readonly cartProductNames: Locator;
  readonly cartProductPrices: Locator;
  readonly cartProductQuantities: Locator;
  readonly cartProductTotals: Locator;
  readonly removeButtons: Locator;
  readonly subscriptionHeading: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscriptionSubmitBtn: Locator;
  readonly subscriptionSuccessMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.cartInfoTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.emptyCartMsg = page.locator('#empty_cart');
    this.proceedToCheckoutBtn = page.locator('.check_out');
    this.registerLoginLink = page.locator('.modal-content a[href="/login"]');
    this.cartProductNames = page.locator('.cart_description h4 a');
    this.cartProductPrices = page.locator('.cart_price p');
    this.cartProductQuantities = page.locator('.cart_quantity button');
    this.cartProductTotals = page.locator('.cart_total_price');
    this.removeButtons = page.locator('.cart_quantity_delete a');
    this.subscriptionHeading = page.locator('#footer h2');
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitBtn = page.locator('#subscribe');
    this.subscriptionSuccessMsg = page.locator('#success-subscribe .alert-success');
  }

  async goToCart() { await this.navigateTo('/view_cart'); }
  async verifyCartPage() { await expect(this.cartInfoTable).toBeVisible({ timeout: 10000 }); }
  async getCartItemCount(): Promise<number> { return this.cartRows.count(); }

  async verifyCartItemCount(expectedCount: number) {
    const count = await this.getCartItemCount();
    expect(count).toBe(expectedCount);
  }

  async getCartProducts(): Promise<CartProduct[]> {
    const products: CartProduct[] = [];
    const rows = await this.cartRows.count();
    for (let i = 0; i < rows; i++) {
      const row = this.cartRows.nth(i);
      products.push({
        name: (await row.locator('.cart_description h4 a').textContent()) || '',
        price: (await row.locator('.cart_price p').textContent()) || '',
        quantity: (await row.locator('.cart_quantity button').textContent()) || '',
        total: (await row.locator('.cart_total_price').textContent()) || '',
      });
    }
    return products;
  }

  async verifyProductInCart(productName: string) {
    await expect(this.cartProductNames.filter({ hasText: productName })).toBeVisible();
  }

  async verifyProductQuantity(expectedQuantity: string) {
    await expect(this.cartProductQuantities.first()).toContainText(expectedQuantity);
  }

  async clickProceedToCheckout() { await this.proceedToCheckoutBtn.click(); }
  async clickRegisterLogin() { await this.registerLoginLink.click(); }

  async removeProduct(index: number = 0) { await this.removeButtons.nth(index).click(); }

  async verifyCartEmpty() { await expect(this.emptyCartMsg).toBeVisible({ timeout: 10000 }); }

  async verifyProductRemoved(previousCount: number) {
    await this.page.waitForTimeout(1000);
    const currentCount = await this.getCartItemCount();
    expect(currentCount).toBeLessThan(previousCount);
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
}
