import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Scroll Functionality @ui @regression', () => {
  /**
   * Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
   * Verifies scroll arrow button navigates to top.
   */
  test('TC25 - Scroll up using arrow button', async ({ homePage }) => {
    // Step 1-3: Navigate and verify
    await homePage.goToHomePage();

    // Step 4: Scroll down to bottom
    await homePage.scrollToBottom();

    // Step 5: Verify SUBSCRIPTION is visible
    await expect(homePage.subscriptionHeading).toContainText('Subscription', { ignoreCase: true });

    // Step 6: Click scroll up arrow
    await homePage.clickScrollUpArrow();

    // Step 7: Verify scrolled to top - hero text visible
    await homePage.verifyHeroSectionVisible();
  });

  /**
   * Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
   * Verifies manual scroll up navigates to top correctly.
   */
  test('TC26 - Scroll up without arrow button', async ({ homePage }) => {
    // Step 1-3: Navigate and verify
    await homePage.goToHomePage();

    // Step 4: Scroll down to bottom
    await homePage.scrollToBottom();

    // Step 5: Verify SUBSCRIPTION is visible
    await expect(homePage.subscriptionHeading).toContainText('Subscription', { ignoreCase: true });

    // Step 6: Scroll up to top (without arrow)
    await homePage.scrollToTop();

    // Step 7: Verify scrolled to top - hero text visible
    await homePage.verifyHeroSectionVisible();
  });
});
