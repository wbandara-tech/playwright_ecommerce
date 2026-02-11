import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';

test.describe('Subscription @regression', () => {
  /**
   * Test Case 10: Verify Subscription in home page
   * Verifies email subscription from home page footer.
   */
  test('TC10 - Subscribe from home page @smoke', async ({ homePage }) => {
    const email = TestDataGenerator.generateEmail();

    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4-6: Scroll to footer, verify subscription, enter email
    await homePage.subscribeWithEmail(email);

    // Step 7: Verify success
    await homePage.verifySubscriptionSuccess();
  });

  /**
   * Test Case 11: Verify Subscription in Cart page
   * Verifies email subscription from cart page footer.
   */
  test('TC11 - Subscribe from cart page', async ({ homePage, cartPage }) => {
    const email = TestDataGenerator.generateEmail();

    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Cart
    await homePage.clickCart();

    // Step 5-7: Scroll, verify subscription, enter email
    await cartPage.subscribeWithEmail(email);

    // Step 8: Verify success
    await cartPage.verifySubscriptionSuccess();
  });
});
