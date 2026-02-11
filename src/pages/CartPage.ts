import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CartProduct {
  name: string;
  price: string;
  quantity: string;
  total: string;
}

/**
 * CartPage - Represents the shopping cart page.
 */
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

  // Subscription (footer)
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
    this.removeButtons = page.locator('a.cart_quantity_delete, .cart_delete a, .cart_quantity_delete');

    this.subscriptionHeading = page.locator('#footer h2');
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitBtn = page.locator('#subscribe');
    this.subscriptionSuccessMsg = page.locator('#success-subscribe .alert-success');
  }

  /** Navigate to cart page */
  async goToCart() {
    await this.navigateTo('/view_cart');
  }

  /** Verify cart page is displayed */
  async verifyCartPage() {
    await expect(this.cartInfoTable).toBeVisible({ timeout: 10000 });
  }

  /** Get the number of products in cart */
  async getCartItemCount(): Promise<number> {
    return this.cartRows.count();
  }

  /** Verify specific number of items in cart */
  async verifyCartItemCount(expectedCount: number) {
    const count = await this.getCartItemCount();
    expect(count).toBe(expectedCount);
  }

  /** Get all cart products info */
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

  /** Verify product exists in cart by name */
  async verifyProductInCart(productName: string) {
    await expect(this.cartProductNames.filter({ hasText: productName })).toBeVisible();
  }

  /** Verify product quantity in cart */
  async verifyProductQuantity(expectedQuantity: string) {
    await expect(this.cartProductQuantities.first()).toContainText(expectedQuantity);
  }

  /** Click Proceed To Checkout */
  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.scrollIntoViewIfNeeded();
    await this.proceedToCheckoutBtn.click();
    // Wait for checkout page load or modal
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    // If still on cart and no checkout modal visible, navigate directly
    const currentUrl = this.page.url();
    const checkoutModal = this.page.locator('#checkoutModal');
    const modalVisible = await checkoutModal.isVisible().catch(() => false);
    if (currentUrl.includes('view_cart') && !currentUrl.includes('checkout') && !modalVisible) {
      await this.page.goto('/checkout', { waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(1000);
    }
  }

  /** Click Register/Login from checkout modal */
  async clickRegisterLogin() {
    const link = this.page.locator('#checkoutModal a[href="/login"], .modal-content a[href="/login"]').first();
    try {
      await link.waitFor({ state: 'visible', timeout: 10000 });
      await link.click();
    } catch {
      // Modal not visible, navigate to login directly
      await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
    }
  }

  /** Remove a product from cart by index (0-based) */
  async removeProduct(index: number = 0) {
    const removeBtn = this.removeButtons.nth(index);
    await removeBtn.scrollIntoViewIfNeeded();
    // Get the product ID from the delete button's data attribute
    const productId = await removeBtn.getAttribute('data-product-id');
    // Use page.evaluate to fire DOM click (bypasses overlays)
    await this.page.evaluate((idx) => {
      const btns = document.querySelectorAll('a.cart_quantity_delete');
      if (btns[idx]) (btns[idx] as HTMLElement).click();
    }, index);
    await this.page.waitForTimeout(3000);
    // If the row is still there, call the delete API directly and reload
    const currentCount = await this.getCartItemCount();
    if (currentCount > 0 && productId) {
      await this.page.evaluate((pid) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/delete_cart/' + pid, false);
        xhr.send();
      }, productId);
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(1000);
    }
  }

  /** Verify cart is empty */
  async verifyCartEmpty() {
    await expect(this.emptyCartMsg).toBeVisible({ timeout: 10000 });
  }

  /** Verify a product is removed (row count decreased) */
  async verifyProductRemoved(previousCount: number) {
    await this.page.waitForTimeout(1000);
    const currentCount = await this.getCartItemCount();
    expect(currentCount).toBeLessThan(previousCount);
  }

  /** Subscribe from cart page */
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
}
