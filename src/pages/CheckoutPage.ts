import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly deliveryAddressSection: Locator;
  readonly billingAddressSection: Locator;
  readonly orderReviewSection: Locator;
  readonly commentTextarea: Locator;
  readonly placeOrderBtn: Locator;
  readonly deliveryFirstLastName: Locator;
  readonly deliveryAddress1: Locator;
  readonly deliveryCityStateZip: Locator;
  readonly deliveryCountry: Locator;
  readonly deliveryPhone: Locator;
  readonly billingFirstLastName: Locator;
  readonly billingAddress1: Locator;
  readonly billingCityStateZip: Locator;
  readonly billingCountry: Locator;
  readonly billingPhone: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddressSection = page.locator('#address_delivery');
    this.billingAddressSection = page.locator('#address_invoice');
    this.orderReviewSection = page.locator('#cart_info');
    this.commentTextarea = page.locator('textarea.form-control');
    this.placeOrderBtn = page.locator('a:has-text("Place Order")');
    this.deliveryFirstLastName = page.locator('#address_delivery .address_firstname');
    this.deliveryAddress1 = page.locator('#address_delivery .address_address1').nth(1);
    this.deliveryCityStateZip = page.locator('#address_delivery .address_city');
    this.deliveryCountry = page.locator('#address_delivery .address_country_name');
    this.deliveryPhone = page.locator('#address_delivery .address_phone');
    this.billingFirstLastName = page.locator('#address_invoice .address_firstname');
    this.billingAddress1 = page.locator('#address_invoice .address_address1').nth(1);
    this.billingCityStateZip = page.locator('#address_invoice .address_city');
    this.billingCountry = page.locator('#address_invoice .address_country_name');
    this.billingPhone = page.locator('#address_invoice .address_phone');
  }

  async verifyCheckoutPage() {
    await expect(this.deliveryAddressSection).toBeVisible({ timeout: 10000 });
    await expect(this.orderReviewSection).toBeVisible();
  }

  async placeOrder(comment: string = 'Please deliver ASAP.') {
    await this.fillInput(this.commentTextarea, comment);
    await this.placeOrderBtn.click();
  }

  async verifyDeliveryAddress(expectedData: { name?: string; address?: string; cityStateZip?: string; country?: string; phone?: string; }) {
    if (expectedData.name) await expect(this.deliveryFirstLastName).toContainText(expectedData.name);
    if (expectedData.address) await expect(this.deliveryAddress1).toContainText(expectedData.address);
    if (expectedData.cityStateZip) await expect(this.deliveryCityStateZip).toContainText(expectedData.cityStateZip);
    if (expectedData.country) await expect(this.deliveryCountry).toContainText(expectedData.country);
    if (expectedData.phone) await expect(this.deliveryPhone).toContainText(expectedData.phone);
  }

  async verifyBillingAddress(expectedData: { name?: string; address?: string; cityStateZip?: string; country?: string; phone?: string; }) {
    if (expectedData.name) await expect(this.billingFirstLastName).toContainText(expectedData.name);
    if (expectedData.address) await expect(this.billingAddress1).toContainText(expectedData.address);
    if (expectedData.cityStateZip) await expect(this.billingCityStateZip).toContainText(expectedData.cityStateZip);
    if (expectedData.country) await expect(this.billingCountry).toContainText(expectedData.country);
    if (expectedData.phone) await expect(this.billingPhone).toContainText(expectedData.phone);
  }
}
