import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';
import fs from 'fs';

test.describe('Download Invoice @checkout @regression', () => {
  /**
   * Test Case 24: Download Invoice after purchase order
   * Verifies complete order flow with invoice download.
   */
  test('TC24 - Download invoice after purchase order', async ({
    homePage, productsPage, cartPage, loginPage, signupPage, checkoutPage, paymentPage,
  }) => {
    const email = TestDataGenerator.generateEmail();
    const name = TestDataGenerator.generateName();
    const signupData = TestDataGenerator.generateSignupData();
    const paymentData = TestDataGenerator.generatePaymentData();

    // Step 1-3: Navigate and verify
    await homePage.goToHomePage();

    // Step 4: Add products to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // Step 5: Click Cart
    await homePage.clickCart();

    // Step 6: Verify cart page
    await cartPage.verifyCartPage();

    // Step 7: Proceed to Checkout
    await cartPage.clickProceedToCheckout();

    // Step 8: Click Register/Login
    await cartPage.clickRegisterLogin();

    // Step 9: Register
    await loginPage.enterSignupDetails(name, email);
    await signupPage.fillSignupForm(signupData);
    await signupPage.clickCreateAccount();

    // Step 10: Verify account created
    await signupPage.verifyAccountCreatedAndContinue();

    // Step 11: Verify logged in
    await homePage.verifyUserLoggedIn();

    // Step 12: Click Cart
    await homePage.clickCart();

    // Step 13: Proceed to Checkout
    await cartPage.clickProceedToCheckout();

    // Step 14: Verify Address and Order
    await checkoutPage.verifyCheckoutPage();

    // Step 15: Place order
    await checkoutPage.placeOrder('Please include invoice in the package.');

    // Step 16-17: Payment
    await paymentPage.fillPaymentDetails(paymentData);
    await paymentPage.clickPayAndConfirm();

    // Step 18: Verify success
    await paymentPage.verifyOrderPlaced();

    // Step 19: Download Invoice
    const invoicePath = await paymentPage.downloadInvoice();
    expect(fs.existsSync(invoicePath)).toBeTruthy();

    // Step 20: Click Continue
    await paymentPage.clickContinue();

    // Step 21: Delete account
    await homePage.clickDeleteAccount();

    // Step 22: Verify deleted
    await signupPage.verifyAccountDeletedAndContinue();
  });
});
