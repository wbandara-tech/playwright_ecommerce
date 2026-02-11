import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';
import { TestData } from '../../src/data/test-data';

test.describe('User Login @auth @regression', () => {
  /**
   * Test Case 2: Login User with correct email and password
   * Verifies successful login with valid credentials.
   */
  test('TC02 - Login with correct credentials @smoke', async ({ homePage, loginPage, signupPage }) => {
    // First register a user to have valid credentials
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

    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Signup/Login
    await homePage.clickSignupLogin();

    // Step 5: Verify login form
    await expect(loginPage.loginHeading).toContainText('Login to your account');

    // Step 6-7: Enter correct credentials and login
    await loginPage.login(email, signupData.password);

    // Step 8: Verify logged in
    await homePage.verifyUserLoggedIn();

    // Step 9: Delete account
    await homePage.clickDeleteAccount();

    // Step 10: Verify account deleted
    await signupPage.verifyAccountDeletedAndContinue();
  });

  /**
   * Test Case 3: Login User with incorrect email and password
   * Verifies error message shown for invalid credentials.
   */
  test('TC03 - Login with incorrect credentials shows error @smoke', async ({ homePage, loginPage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Signup/Login
    await homePage.clickSignupLogin();

    // Step 5: Verify login form
    await expect(loginPage.loginHeading).toContainText('Login to your account');

    // Step 6-7: Enter incorrect credentials
    await loginPage.login(TestData.INVALID_USER.email, TestData.INVALID_USER.password);

    // Step 8: Verify error message
    await loginPage.verifyLoginError();
  });
});
