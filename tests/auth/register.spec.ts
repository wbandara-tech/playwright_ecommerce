import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';

test.describe('User Registration @auth @regression', () => {
  /**
   * Test Case 1: Register User
   * Verifies complete user registration flow including form fill,
   * account creation, and account deletion.
   */
  test('TC01 - Register new user successfully @smoke', async ({ homePage, loginPage, signupPage }) => {
    const email = TestDataGenerator.generateEmail();
    const name = TestDataGenerator.generateName();
    const signupData = TestDataGenerator.generateSignupData();

    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Signup/Login
    await homePage.clickSignupLogin();

    // Step 5: Verify signup form
    await expect(loginPage.signupHeading).toContainText('New User Signup!');

    // Step 6-7: Enter name/email and click signup
    await loginPage.enterSignupDetails(name, email);

    // Step 8: Verify account info form
    await signupPage.verifyAccountInfoVisible();

    // Step 9-12: Fill all details
    await signupPage.fillSignupForm(signupData);

    // Step 13: Click Create Account
    await signupPage.clickCreateAccount();

    // Step 14-15: Verify account created and continue
    await signupPage.verifyAccountCreatedAndContinue();

    // Step 16: Verify logged in
    await homePage.verifyUserLoggedIn();

    // Step 17: Delete account
    await homePage.clickDeleteAccount();

    // Step 18: Verify account deleted
    await signupPage.verifyAccountDeletedAndContinue();
  });

  /**
   * Test Case 5: Register User with existing email
   * Verifies error message when signing up with already registered email.
   */
  test('TC05 - Register with existing email shows error', async ({ homePage, loginPage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Signup/Login
    await homePage.clickSignupLogin();

    // Step 5: Verify signup form
    await expect(loginPage.signupHeading).toContainText('New User Signup!');

    // Step 6-7: Enter already registered email
    // First register a user, then try again with same email
    const email = TestDataGenerator.generateEmail();
    const name = TestDataGenerator.generateName();

    // Register first
    await loginPage.enterSignupDetails(name, email);
    const signupData = TestDataGenerator.generateSignupData();
    await loginPage.page.locator('#id_gender1').check();
    await loginPage.page.locator('#password').fill(signupData.password);
    await loginPage.page.locator('#days').selectOption(signupData.day);
    await loginPage.page.locator('#months').selectOption(signupData.month);
    await loginPage.page.locator('#years').selectOption(signupData.year);
    await loginPage.page.locator('#first_name').fill(signupData.firstName);
    await loginPage.page.locator('#last_name').fill(signupData.lastName);
    await loginPage.page.locator('#address1').fill(signupData.address);
    await loginPage.page.locator('#country').selectOption(signupData.country);
    await loginPage.page.locator('#state').fill(signupData.state);
    await loginPage.page.locator('#city').fill(signupData.city);
    await loginPage.page.locator('#zipcode').fill(signupData.zipcode);
    await loginPage.page.locator('#mobile_number').fill(signupData.mobileNumber);
    await loginPage.page.locator('button[data-qa="create-account"]').click();
    await loginPage.page.locator('a[data-qa="continue-button"]').click();
    await loginPage.handleAdsConsentPopups();

    // Logout
    await loginPage.page.locator('a[href="/logout"]').click();

    // Step 6-7: Try to signup with same email
    await expect(loginPage.signupHeading).toContainText('New User Signup!');
    await loginPage.enterSignupDetails(name, email);

    // Step 8: Verify error
    await loginPage.verifySignupError();
  });
});
