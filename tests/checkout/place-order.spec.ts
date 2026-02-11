import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';

test.describe('Place Order @checkout @regression', () => {
  /**
   * Test Case 14: Place Order - Register while Checkout
   * Verifies end-to-end order placement with registration during checkout.
   */
  test('TC14 - Place order: Register while checkout @smoke', async ({
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

    // Step 9: Fill signup and create account
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

    // Step 14: Verify Address and Order Review
    await checkoutPage.verifyCheckoutPage();

    // Step 15: Enter comment and place order
    await checkoutPage.placeOrder('Please deliver between 9 AM and 5 PM.');

    // Step 16-17: Enter payment and confirm
    await paymentPage.fillPaymentDetails(paymentData);
    await paymentPage.clickPayAndConfirm();

    // Step 18: Verify success
    await paymentPage.verifyOrderPlaced();

    // Step 19: Delete account
    await homePage.clickDeleteAccount();

    // Step 20: Verify deleted
    await signupPage.verifyAccountDeletedAndContinue();
  });

  /**
   * Test Case 15: Place Order - Register before Checkout
   * Verifies order placement after pre-registration.
   */
  test('TC15 - Place order: Register before checkout', async ({
    homePage, productsPage, cartPage, loginPage, signupPage, checkoutPage, paymentPage,
  }) => {
    const email = TestDataGenerator.generateEmail();
    const name = TestDataGenerator.generateName();
    const signupData = TestDataGenerator.generateSignupData();
    const paymentData = TestDataGenerator.generatePaymentData();

    // Step 1-3: Navigate and verify
    await homePage.goToHomePage();

    // Step 4-6: Register new account
    await homePage.clickSignupLogin();
    await loginPage.enterSignupDetails(name, email);
    await signupPage.fillSignupForm(signupData);
    await signupPage.clickCreateAccount();
    await signupPage.verifyAccountCreatedAndContinue();

    // Step 7: Verify logged in
    await homePage.verifyUserLoggedIn();

    // Step 8: Add products to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // Step 9: Click Cart
    await homePage.clickCart();

    // Step 10: Verify cart page
    await cartPage.verifyCartPage();

    // Step 11: Proceed to checkout
    await cartPage.clickProceedToCheckout();

    // Step 12: Verify address and order
    await checkoutPage.verifyCheckoutPage();

    // Step 13: Place order
    await checkoutPage.placeOrder('Express delivery requested.');

    // Step 14-15: Payment
    await paymentPage.fillPaymentDetails(paymentData);
    await paymentPage.clickPayAndConfirm();

    // Step 16: Verify success
    await paymentPage.verifyOrderPlaced();

    // Step 17: Delete account
    await homePage.clickDeleteAccount();

    // Step 18: Verify deleted
    await signupPage.verifyAccountDeletedAndContinue();
  });

  /**
   * Test Case 16: Place Order - Login before Checkout
   * Verifies order placement with pre-existing logged-in user.
   */
  test('TC16 - Place order: Login before checkout', async ({
    homePage, productsPage, cartPage, loginPage, signupPage, checkoutPage, paymentPage,
  }) => {
    // Create user first
    const email = TestDataGenerator.generateEmail();
    const name = TestDataGenerator.generateName();
    const signupData = TestDataGenerator.generateSignupData();
    const paymentData = TestDataGenerator.generatePaymentData();

    await homePage.goToHomePage();
    await homePage.clickSignupLogin();
    await loginPage.enterSignupDetails(name, email);
    await signupPage.fillSignupForm(signupData);
    await signupPage.clickCreateAccount();
    await signupPage.verifyAccountCreatedAndContinue();
    await homePage.clickLogout();

    // Step 1-3: Navigate and verify
    await homePage.goToHomePage();

    // Step 4: Click Signup/Login
    await homePage.clickSignupLogin();

    // Step 5: Login
    await loginPage.login(email, signupData.password);

    // Step 6: Verify logged in
    await homePage.verifyUserLoggedIn();

    // Step 7: Add products to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // Step 8: Click Cart
    await homePage.clickCart();

    // Step 9: Verify cart page
    await cartPage.verifyCartPage();

    // Step 10: Proceed to checkout
    await cartPage.clickProceedToCheckout();

    // Step 11: Verify address and order
    await checkoutPage.verifyCheckoutPage();

    // Step 12: Place order
    await checkoutPage.placeOrder('Standard shipping is fine.');

    // Step 13-14: Payment
    await paymentPage.fillPaymentDetails(paymentData);
    await paymentPage.clickPayAndConfirm();

    // Step 15: Verify success
    await paymentPage.verifyOrderPlaced();

    // Step 16: Delete account
    await homePage.clickDeleteAccount();

    // Step 17: Verify deleted
    await signupPage.verifyAccountDeletedAndContinue();
  });
});
