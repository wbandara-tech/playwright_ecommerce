import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';

test.describe('Contact Us @regression', () => {
  /**
   * Test Case 6: Contact Us Form
   * Verifies complete contact form submission flow.
   */
  test('TC06 - Submit Contact Us form successfully', async ({ homePage, contactUsPage }) => {
    const contactData = TestDataGenerator.generateContactData();

    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Contact Us
    await homePage.clickContactUs();

    // Step 5: Verify GET IN TOUCH heading
    await contactUsPage.verifyContactUsPage();

    // Step 6: Fill form details
    await contactUsPage.fillContactForm(contactData);

    // Step 7: Upload file
    await contactUsPage.uploadFile();

    // Step 8-9: Submit form and accept dialog
    await contactUsPage.submitForm();

    // Step 10: Verify success message
    await contactUsPage.verifySuccessMessage();

    // Step 11: Click Home and verify
    await contactUsPage.clickHome();
    await homePage.verifyHomePage();
  });
});
