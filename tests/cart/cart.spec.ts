import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Cart Management @cart @regression', () => {
  /**
   * Test Case 12: Add Products in Cart
   * Verifies adding multiple products and their details in cart.
   */
  test('TC12 - Add multiple products to cart @smoke', async ({ homePage, productsPage, cartPage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Products
    await homePage.clickProducts();

    // Step 5: Hover over first product and add to cart
    await productsPage.hoverAndAddToCart(0);

    // Step 6: Continue shopping
    await productsPage.clickContinueShopping();

    // Step 7: Hover over second product and add to cart
    await productsPage.hoverAndAddToCart(1);

    // Step 8: Click View Cart
    await productsPage.clickViewCartModal();

    // Step 9: Verify both products in cart
    await cartPage.verifyCartPage();
    await cartPage.verifyCartItemCount(2);

    // Step 10: Verify prices, quantities, and totals
    const products = await cartPage.getCartProducts();
    expect(products).toHaveLength(2);
    for (const product of products) {
      expect(product.price).toBeTruthy();
      expect(product.quantity).toBeTruthy();
      expect(product.total).toBeTruthy();
    }
  });

  /**
   * Test Case 13: Verify Product quantity in Cart
   * Verifies correct quantity is reflected in cart.
   */
  test('TC13 - Verify product quantity in cart', async ({ homePage, productDetailPage, cartPage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click View Product
    await homePage.clickViewProduct(0);

    // Step 5: Verify product detail opened
    await productDetailPage.verifyProductDetails();

    // Step 6: Set quantity to 4
    await productDetailPage.setQuantity(4);

    // Step 7: Click Add to Cart
    await productDetailPage.clickAddToCart();

    // Step 8: Click View Cart
    await productDetailPage.clickViewCart();

    // Step 9: Verify quantity is 4
    await cartPage.verifyCartPage();
    await cartPage.verifyProductQuantity('4');
  });

  /**
   * Test Case 17: Remove Products From Cart
   * Verifies product removal from cart.
   */
  test('TC17 - Remove products from cart', async ({ homePage, productsPage, cartPage }) => {
    // Step 1-3: Navigate
    await homePage.goToHomePage();

    // Step 4: Add product to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // Step 5: Click Cart
    await homePage.clickCart();

    // Step 6: Verify cart page
    await cartPage.verifyCartPage();
    const initialCount = await cartPage.getCartItemCount();

    // Step 7: Remove product
    await cartPage.removeProduct(0);

    // Step 8: Verify product removed
    await cartPage.verifyProductRemoved(initialCount);
  });

  /**
   * Test Case 22: Add to cart from Recommended items
   * Verifies adding recommended products to cart.
   */
  test('TC22 - Add to cart from recommended items', async ({ homePage, cartPage }) => {
    // Step 1-2: Navigate
    await homePage.goToHomePage();

    // Step 3-4: Scroll to bottom and verify Recommended Items
    await homePage.addRecommendedItemToCart();

    // Step 5-6: Click View Cart in modal
    const viewCartLink = homePage.page.locator('.modal-content a:has-text("View Cart")');
    await expect(viewCartLink).toBeVisible({ timeout: 5000 });
    await viewCartLink.click();

    // Step 7: Verify product in cart
    await cartPage.verifyCartPage();
    const count = await cartPage.getCartItemCount();
    expect(count).toBeGreaterThan(0);
  });
});
