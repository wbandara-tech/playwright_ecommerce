# Playwright E-Commerce Automation Framework

> Industrial-standard end-to-end test automation framework for [AutomationExercise.com](https://automationexercise.com) built with **Playwright + TypeScript**.

---

## Test Coverage

| # | Test Case | Tags |
|---|-----------|------|
| TC01 | Register User | `@auth` `@smoke` |
| TC02 | Login with correct credentials | `@auth` `@smoke` |
| TC03 | Login with incorrect credentials | `@auth` `@smoke` |
| TC04 | Logout User | `@auth` |
| TC05 | Register with existing email | `@auth` |
| TC06 | Contact Us Form | `@regression` |
| TC07 | Verify Test Cases Page | `@products` |
| TC08 | Verify All Products & Detail Page | `@products` `@smoke` |
| TC09 | Search Product | `@products` `@smoke` |
| TC10 | Subscription on Home Page | `@smoke` |
| TC11 | Subscription on Cart Page | `@regression` |
| TC12 | Add Products to Cart | `@cart` `@smoke` |
| TC13 | Verify Product Quantity in Cart | `@cart` |
| TC14 | Place Order: Register while Checkout | `@checkout` `@smoke` |
| TC15 | Place Order: Register before Checkout | `@checkout` |
| TC16 | Place Order: Login before Checkout | `@checkout` |
| TC17 | Remove Products from Cart | `@cart` |
| TC18 | View Category Products | `@products` |
| TC19 | View & Cart Brand Products | `@products` |
| TC20 | Search Products & Verify Cart After Login | `@products` |
| TC21 | Add Review on Product | `@products` |
| TC22 | Add to Cart from Recommended Items | `@cart` |
| TC23 | Verify Address Details in Checkout | `@checkout` |
| TC24 | Download Invoice after Purchase | `@checkout` |
| TC25 | Scroll Up using Arrow Button | `@ui` |
| TC26 | Scroll Up without Arrow Button | `@ui` |

---

## Architecture & Design Patterns

```
playwright_ecommerce/
├── .github/workflows/          # CI/CD pipeline (GitHub Actions)
├── src/
│   ├── pages/                  # Page Object Models (POM)
│   │   ├── BasePage.ts         # Abstract base class
│   │   ├── HomePage.ts         # Home page interactions
│   │   ├── LoginPage.ts        # Login/Signup entry
│   │   ├── SignupPage.ts       # Registration form
│   │   ├── ProductsPage.ts     # Products listing
│   │   ├── ProductDetailPage.ts# Product detail view
│   │   ├── CartPage.ts         # Shopping cart
│   │   ├── CheckoutPage.ts     # Checkout flow
│   │   ├── PaymentPage.ts      # Payment processing
│   │   └── ContactUsPage.ts    # Contact form
│   ├── fixtures/
│   │   └── test-fixtures.ts    # Custom Playwright fixtures (DI)
│   ├── utils/
│   │   └── TestDataGenerator.ts# Dynamic test data (Faker.js)
│   └── data/
│       ├── test-data.ts        # Static test constants
│       └── upload-sample.txt   # File for upload tests
├── tests/
│   ├── auth/                   # TC01-TC05: Authentication tests
│   ├── contact/                # TC06: Contact Us tests
│   ├── products/               # TC07-TC09, TC18-TC21: Product tests
│   ├── subscription/           # TC10-TC11: Subscription tests
│   ├── cart/                   # TC12-TC13, TC17, TC22: Cart tests
│   ├── checkout/               # TC14-TC16, TC23-TC24: Checkout tests
│   └── ui/                     # TC25-TC26: UI/Scroll tests
├── playwright.config.ts        # Playwright configuration
├── .env                        # Environment variables (gitignored)
├── .env.example                # Env template
├── .eslintrc.json              # ESLint config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies & scripts
```

### Key Design Patterns:
- **Page Object Model (POM)** - Encapsulated UI interactions per page
- **Fixture-based DI** - Playwright custom fixtures for page injection
- **Builder Pattern** - TestDataGenerator for flexible test data creation
- **Data-driven Testing** - Centralized test data management
- **Environment Configuration** - dotenv for env-specific settings

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your test credentials
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run with Playwright UI
npm run test:ui

# Debug mode
npm run test:debug

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run by tag
npm run test:auth        # Authentication tests
npm run test:cart        # Cart tests
npm run test:checkout    # Checkout tests
npm run test:products    # Product tests
npm run test:smoke       # Smoke suite
npm run test:regression  # Full regression
```

### Run Specific Test File

```bash
npx playwright test tests/auth/login.spec.ts
npx playwright test tests/checkout/place-order.spec.ts
```

---

## Reporting

```bash
# View HTML report
npm run report

# Generate & open Allure report
npm run report:allure
```

Reports include:
- HTML Report with screenshots on failure
- Video recordings on first retry
- Trace viewer for debugging
- Allure Report with detailed analytics

---

## CI/CD

GitHub Actions workflows provide:
- **playwright-ci.yml** - Comprehensive pipeline with lint, test matrix, smoke tests, and GitHub Pages report publishing
- **playwright.yml** - Scheduled runs Mon-Fri at 6 AM UTC with cross-browser matrix

Triggers:
- On push to `main` / `develop`
- On pull requests to `main`
- Manual dispatch with tag/browser selection
- Scheduled: Mon-Fri at 6 AM UTC

---

## Industrial Standards Applied

| Standard | Implementation |
|----------|---------------|
| Page Object Model | All UI interactions encapsulated in page classes |
| DRY Principle | Base class with shared utilities |
| Single Responsibility | Each page class handles one page |
| Dependency Injection | Playwright fixtures for page object injection |
| Data Separation | Test data decoupled from test logic |
| Environment Config | `.env` for environment-specific values |
| Cross-browser | Chromium, Firefox, WebKit support |
| CI/CD Ready | GitHub Actions with matrix strategy |
| Reporting | HTML + Allure + JSON reporters |
| Auto-retry | Configurable retry on failure |
| Screenshot on Failure | Automatic evidence capture |
| Video Recording | On first retry for debugging |
| Trace Viewer | Full execution trace on retry |
| TypeScript | Type safety throughout |
| ESLint | Code quality enforcement |
| Tag-based Execution | `@smoke`, `@regression`, `@auth`, etc. |

---

## License

MIT
