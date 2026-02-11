import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';

test.describe('Address Verification @checkout @regression', () => {
  /**
   * Test Case 23: Verify address details in checkout page
   * Verifies delivery & billing addresses match registration data.
   */
  test('TC23 - Verify address details in checkout page', async ({
    homePage, productsPage, cartPage, loginPage, signupPage, checkoutPage,
  }) => {
    const email = TestDataGenerator.generateEmail();
    const name = TestDataGenerator.generateName();
    const signupData = TestDataGenerator.generateSignupData();

    // Step 1-3: Navigate and verify
    await homePage.goToHomePage();

    // Step 4-6: Register
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

    // Step 12: Verify delivery address
    await checkoutPage.verifyDeliveryAddress({
      name: `${signupData.firstName} ${signupData.lastName}`,
      address: signupData.address,
      phone: signupData.mobileNumber,
    });

    // Step 13: Verify billing address
    await checkoutPage.verifyBillingAddress({
      name: `${signupData.firstName} ${signupData.lastName}`,
      address: signupData.address,
      phone: signupData.mobileNumber,
    });

    // Step 14: Delete account
    await homePage.clickDeleteAccount();

    // Step 15: Verify deleted
    await signupPage.verifyAccountDeletedAndContinue();
  });
});
