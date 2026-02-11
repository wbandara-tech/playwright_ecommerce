import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestData } from '../../src/data/test-data';

test.describe('Products @products @regression', () => {
  /**
   * Test Case 7: Verify Test Cases Page
   * Verifies navigation to test cases page.
   */
  test('TC07 - Navigate to Test Cases page', async ({ homePage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Test Cases
    await homePage.clickTestCases();

    // Step 5: Verify test cases page
    await homePage.verifyUrl('/test_cases');
    await homePage.verifyTextVisible('Test Cases');
  });

  /**
   * Test Case 8: Verify All Products and product detail page
   * Verifies products listing and product detail page.
   */
  test('TC08 - Verify All Products and product detail page @smoke', async ({ homePage, productsPage, productDetailPage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Products
    await homePage.clickProducts();

    // Step 5-6: Verify products page and list
    await productsPage.verifyProductsPage();

    // Step 7: Click View Product of first product
    await productsPage.clickViewProduct(0);

    // Step 8-9: Verify product detail page
    await productDetailPage.verifyProductDetails();
  });

  /**
   * Test Case 9: Search Product
   * Verifies product search functionality.
   */
  test('TC09 - Search for a product @smoke', async ({ homePage, productsPage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 4: Click Products
    await homePage.clickProducts();

    // Step 5: Verify products page
    await productsPage.verifyProductsPage();

    // Step 6: Search for a product
    await productsPage.searchProduct(TestData.SEARCH_TERMS.tshirt);

    // Step 7: Verify SEARCHED PRODUCTS heading
    await productsPage.verifySearchedProducts();

    // Step 8: Verify search results are visible
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  /**
   * Test Case 18: View Category Products
   * Verifies category navigation and product listing.
   */
  test('TC18 - View category products', async ({ homePage }) => {
    // Step 1-3: Navigate and verify home page
    await homePage.goToHomePage();

    // Step 3: Verify categories visible
    await expect(homePage.categorySection).toBeVisible();

    // Step 4-5: Click on Women > Dress
    await homePage.clickWomenSubCategory('Dress');

    // Step 6: Verify category page
    await homePage.verifyTextVisible('Women');
    await homePage.verifyTextVisible('Products');

    // Step 7: Click on Men sub-category
    await homePage.clickMenSubCategory('Tshirts');

    // Step 8: Verify Men category page
    await homePage.verifyTextVisible('Men');
  });

  /**
   * Test Case 19: View & Cart Brand Products
   * Verifies brand navigation and product listing.
   */
  test('TC19 - View and cart brand products', async ({ homePage, productsPage }) => {
    // Step 1-2: Navigate
    await homePage.goToHomePage();

    // Step 3: Click Products
    await homePage.clickProducts();

    // Step 4: Verify brands visible
    await productsPage.verifyBrandsVisible();

    // Step 5-6: Click on a brand
    await productsPage.clickBrand('Polo');
    await productsPage.verifyBrandPage('Polo');

    // Step 7-8: Click another brand
    await productsPage.clickBrand('H&M');
    await productsPage.verifyBrandPage('H&M');
  });

  /**
   * Test Case 21: Add review on product
   * Verifies product review submission.
   */
  test('TC21 - Add review on product', async ({ homePage, productsPage, productDetailPage }) => {
    const reviewData = {
      name: 'Test Reviewer',
      email: 'reviewer@test.com',
      review: 'Great product! Excellent quality and fast delivery.',
    };

    // Step 1-2: Navigate
    await homePage.goToHomePage();

    // Step 3: Click Products
    await homePage.clickProducts();

    // Step 4: Verify navigated to ALL PRODUCTS
    await productsPage.verifyProductsPage();

    // Step 5: Click View Product
    await productsPage.clickViewProduct(0);

    // Step 6: Verify Write Your Review is visible
    await expect(productDetailPage.writeReviewHeading).toBeVisible();

    // Step 7-8: Submit review
    await productDetailPage.submitReview(reviewData.name, reviewData.email, reviewData.review);

    // Step 9: Verify success
    await productDetailPage.verifyReviewSuccess();
  });
});
