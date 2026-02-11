import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ContactUsPage } from '../pages/ContactUsPage';

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  contactUsPage: ContactUsPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  signupPage: async ({ page }, use) => { await use(new SignupPage(page)); },
  productsPage: async ({ page }, use) => { await use(new ProductsPage(page)); },
  productDetailPage: async ({ page }, use) => { await use(new ProductDetailPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  paymentPage: async ({ page }, use) => { await use(new PaymentPage(page)); },
  contactUsPage: async ({ page }, use) => { await use(new ContactUsPage(page)); },
});

export { expect } from '@playwright/test';
