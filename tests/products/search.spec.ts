import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestData } from '../../src/data/test-data';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';

test.describe('Search Products @products @regression', () => {
  /**
   * Test Case 20: Search Products and Verify Cart After Login
   * Verifies that searched products persist in cart after login.
   */
  test('TC20 - Search products and verify cart after login', async ({
    homePage, productsPage, cartPage, loginPage, signupPage,
  }) => {
    // First create a user account
    const email = TestDataGenerator.generateEmail();
    const name = TestDataGenerator.generateName();
    const signupData = TestDataGenerator.generateSignupData();

    await homePage.goToHomePage();
    await homePage.clickSignupLogin();
    await loginPage.enterSignupDetails(name, email);
    await signupPage.fillSignupForm(signupData);
    await signupPage.clickCreateAccount();
    await signupPage.verifyAccountCreatedAndContinue();
    await homePage.clickLogout();

    // Step 1-2: Navigate
    await homePage.goToHomePage();

    // Step 3: Click Products
    await homePage.clickProducts();

    // Step 4: Verify ALL PRODUCTS page
    await productsPage.verifyProductsPage();

    // Step 5: Search for product
    await productsPage.searchProduct(TestData.SEARCH_TERMS.top);

    // Step 6: Verify SEARCHED PRODUCTS
    await productsPage.verifySearchedProducts();

    // Step 7: Verify products are visible
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // Step 8: Add products to cart
    for (let i = 0; i < Math.min(productCount, 2); i++) {
      await productsPage.hoverAndAddToCart(i);
      await productsPage.clickContinueShopping();
    }

    // Step 9: Click Cart and verify
    await homePage.clickCart();
    await cartPage.verifyCartPage();
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBeGreaterThan(0);

    // Step 10: Login
    await homePage.clickSignupLogin();
    await loginPage.login(email, signupData.password);

    // Step 11: Go to Cart page
    await homePage.clickCart();

    // Step 12: Verify products still in cart
    await cartPage.verifyCartPage();
    const cartCountAfterLogin = await cartPage.getCartItemCount();
    expect(cartCountAfterLogin).toBeGreaterThan(0);

    // Cleanup: Delete account
    await homePage.clickDeleteAccount();
    await signupPage.verifyAccountDeletedAndContinue();
  });
});
