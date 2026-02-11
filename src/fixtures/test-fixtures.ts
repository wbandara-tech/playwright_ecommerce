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

/**
 * Custom test fixtures - Dependency Injection pattern.
 * Each test automatically receives pre-initialized page objects.
 */
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
  page: async ({ page }, use) => {
    // Block ad-specific domains to prevent consent popups and ad overlays
    await page.route(
      /doubleclick\.net|googlesyndication\.com|googletagmanager\.com|google-analytics\.com|googleadservices\.com|adservice\.google|pagead\/|fundingchoicesmessages\.google|securepubads|amazon-adsystem|ads\.yahoo|consent\.google|tpc\.googlesyndication/,
      (route) => route.abort()
    );

    // Auto-remove consent overlays via init script
    await page.addInitScript(() => {
      // Neutralise consent-management frameworks before they initialise
      (window as any).__cmp = () => {};
      (window as any).__tcfapi = () => {};
      (window as any).googlefc = { callbackQueue: [], controlledMessagingFunction: () => {} };

      const removeOverlays = () => {
        document.querySelectorAll(
          '.fc-consent-root, .fc-dialog-overlay, .fc-dialog-container, #fc-dialog-container, ' +
          'iframe[src*="consent.google"], iframe[src*="fundingchoices"], iframe[src*="googleads"], ' +
          'div[id*="google_ads_iframe"], ins.adsbygoogle, .adsbygoogle, ' +
          '#ad_position_box, .grippy-host, div[id^="aswift_"], div[id^="google_ads"]'
        ).forEach(el => { (el as HTMLElement).style.display = 'none'; el.remove(); });
        // Remove any fixed/sticky overlays that might block interactions
        document.querySelectorAll('div[style*="position: fixed"], div[style*="position:fixed"]').forEach(el => {
          const style = window.getComputedStyle(el);
          if (parseInt(style.zIndex || '0') > 999 && el.id !== 'scrollUp'
            && !el.closest('.modal') && !el.closest('#cartModal') && !el.closest('#checkoutModal')
            && !el.classList.contains('modal-backdrop') && !el.classList.contains('modal')) {
            el.remove();
          }
        });
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeOverlays);
      }
      setInterval(removeOverlays, 300);
      new MutationObserver(removeOverlays).observe(document.documentElement, { childList: true, subtree: true });
    });

    await use(page);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
});

export { expect } from '@playwright/test';
