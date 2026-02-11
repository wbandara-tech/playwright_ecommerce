import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/TestDataGenerator';

test.describe('User Logout @auth @regression', () => {
  /**
   * Test Case 4: Logout User
   * Verifies user can logout and is redirected to login page.
   */
  test('TC04 - Logout user successfully', async ({ homePage, loginPage, signupPage }) => {
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

    // Step 6-7: Login with valid credentials
    await loginPage.login(email, signupData.password);

    // Step 8: Verify logged in
    await homePage.verifyUserLoggedIn();

    // Step 9: Click Logout
    await homePage.clickLogout();

    // Step 10: Verify navigated to login page
    await expect(loginPage.loginHeading).toBeVisible();
    await loginPage.verifyUrl('/login');
  });
});
