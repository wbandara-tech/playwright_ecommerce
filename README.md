# 🎭 Playwright E-Commerce Automation Framework

[![Playwright Tests](https://img.shields.io/badge/Playwright-v1.49-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](#-cicd-pipeline)

> A modern, industrial-standard end-to-end test automation framework for [AutomationExercise.com](https://automationexercise.com) built with **Playwright for Node.js** and **TypeScript**.

Demonstrates best practices for E2E testing including **Page Object Model**, **fixture-based dependency injection**, **dynamic test data generation**, **Allure reporting**, and **CI/CD integration**.

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| 📁 GitHub Repository | [wbandara-tech/playwright_ecommerce](https://github.com/wbandara-tech/playwright_ecommerce) |
| 📊 Allure Report (GitHub Pages) | [Live Report](https://wbandara-tech.github.io/playwright_ecommerce/) |
| ⚙️ CI/CD Pipeline | [GitHub Actions](https://github.com/wbandara-tech/playwright_ecommerce/actions) |
| 🌐 App Under Test | [AutomationExercise.com](https://automationexercise.com) |

---

## 📑 Table of Contents

- [Quick Links](#-quick-links)
- [Tech Stack](#-tech-stack)
- [Test Coverage](#-test-coverage)
- [Architecture & Design Patterns](#️-architecture--design-patterns)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Reporting](#-reporting)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Industrial Standards Applied](#-industrial-standards-applied)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & testing |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test development |
| [Faker.js](https://fakerjs.dev/) | Dynamic test data generation |
| [Allure](https://allurereport.org/) | Advanced test reporting |
| [ESLint](https://eslint.org/) | Code quality & linting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [dotenv](https://github.com/motdotla/dotenv) | Environment configuration |

---

## 📋 Test Coverage

**26 test cases** across 7 functional modules covering the full e-commerce user journey:

| # | Test Case | Module | Tags |
|---|-----------|--------|------|
| TC01 | Register User | Auth | `@auth` `@smoke` |
| TC02 | Login with correct credentials | Auth | `@auth` `@smoke` |
| TC03 | Login with incorrect credentials | Auth | `@auth` `@smoke` |
| TC04 | Logout User | Auth | `@auth` |
| TC05 | Register with existing email | Auth | `@auth` |
| TC06 | Contact Us Form | Contact | `@regression` |
| TC07 | Verify Test Cases Page | Products | `@products` |
| TC08 | Verify All Products & Detail Page | Products | `@products` `@smoke` |
| TC09 | Search Product | Products | `@products` `@smoke` |
| TC10 | Subscription on Home Page | Subscription | `@smoke` |
| TC11 | Subscription on Cart Page | Subscription | `@regression` |
| TC12 | Add Products to Cart | Cart | `@cart` `@smoke` |
| TC13 | Verify Product Quantity in Cart | Cart | `@cart` |
| TC14 | Place Order: Register while Checkout | Checkout | `@checkout` `@smoke` |
| TC15 | Place Order: Register before Checkout | Checkout | `@checkout` |
| TC16 | Place Order: Login before Checkout | Checkout | `@checkout` |
| TC17 | Remove Products from Cart | Cart | `@cart` |
| TC18 | View Category Products | Products | `@products` |
| TC19 | View & Cart Brand Products | Products | `@products` |
| TC20 | Search Products & Verify Cart After Login | Products | `@products` |
| TC21 | Add Review on Product | Products | `@products` |
| TC22 | Add to Cart from Recommended Items | Cart | `@cart` |
| TC23 | Verify Address Details in Checkout | Checkout | `@checkout` |
| TC24 | Download Invoice after Purchase | Checkout | `@checkout` |
| TC25 | Scroll Up using Arrow Button | UI | `@ui` |
| TC26 | Scroll Up without Arrow Button | UI | `@ui` |

---

## 🏗️ Architecture & Design Patterns

```
playwright_ecommerce/
├── .github/
│   └── workflows/
│       └── playwright-ci.yml      # CI/CD pipeline (GitHub Actions)
├── src/
│   ├── pages/                     # Page Object Models (POM)
│   │   ├── BasePage.ts            # Abstract base class with shared utils
│   │   ├── HomePage.ts            # Home page interactions
│   │   ├── LoginPage.ts           # Login & signup entry
│   │   ├── SignupPage.ts          # Registration form
│   │   ├── ProductsPage.ts       # Products listing & search
│   │   ├── ProductDetailPage.ts   # Product detail view
│   │   ├── CartPage.ts            # Shopping cart operations
│   │   ├── CheckoutPage.ts       # Checkout flow
│   │   ├── PaymentPage.ts        # Payment processing
│   │   ├── ContactUsPage.ts      # Contact form
│   │   └── index.ts              # Barrel exports
│   ├── fixtures/
│   │   └── test-fixtures.ts      # Custom Playwright fixtures (DI)
│   ├── utils/
│   │   └── TestDataGenerator.ts  # Dynamic test data (Faker.js)
│   └── data/
│       ├── test-data.ts          # Static test constants
│       └── upload-sample.txt     # File for upload tests
├── tests/
│   ├── auth/                     # TC01-TC05: Authentication tests
│   │   ├── register.spec.ts
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── contact/                  # TC06: Contact Us tests
│   │   └── contact-us.spec.ts
│   ├── products/                 # TC07-TC09, TC18-TC21: Product tests
│   │   ├── products.spec.ts
│   │   └── search.spec.ts
│   ├── subscription/             # TC10-TC11: Subscription tests
│   │   └── subscription.spec.ts
│   ├── cart/                     # TC12-TC13, TC17, TC22: Cart tests
│   │   └── cart.spec.ts
│   ├── checkout/                 # TC14-TC16, TC23-TC24: Checkout tests
│   │   ├── place-order.spec.ts
│   │   ├── address-verification.spec.ts
│   │   └── download-invoice.spec.ts
│   └── ui/                      # TC25-TC26: UI/Scroll tests
│       └── scroll.spec.ts
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── .eslintrc.json                # ESLint rules
├── .env.example                  # Environment variable template
└── package.json                  # Dependencies & npm scripts
```

### Design Patterns

| Pattern | Description |
|---------|-------------|
| **Page Object Model (POM)** | Encapsulated UI interactions per page with reusable methods |
| **Fixture-based DI** | Playwright custom fixtures for automatic page object injection |
| **Builder Pattern** | `TestDataGenerator` for flexible, dynamic test data creation |
| **Barrel Exports** | Centralized `index.ts` for clean page object imports |
| **Data-driven Testing** | Static + dynamic test data separated from test logic |
| **Environment Config** | `dotenv` for environment-specific configuration |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |

### Installation

```bash
# Clone the repository
git clone https://github.com/wbandara-tech/playwright_ecommerce.git
cd playwright_ecommerce

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your test credentials
# BASE_URL=https://automationexercise.com
# TEST_USER_EMAIL=your-email@example.com
# TEST_USER_PASSWORD=your-password
```

---

## 🧪 Running Tests

### Full Suite

```bash
# Run all tests (default: 2 workers)
npm test

# Run in headed mode (visible browser)
npm run test:headed

# Run with Playwright UI mode
npm run test:ui

# Debug mode (step through tests)
npm run test:debug
```

### By Browser

```bash
npm run test:chrome      # Chromium
npm run test:firefox     # Firefox
npm run test:webkit      # WebKit (Safari)
```

### By Tag

```bash
npm run test:smoke       # 🔥 Smoke suite (critical path)
npm run test:regression  # 🔄 Full regression
npm run test:auth        # 🔐 Authentication tests
npm run test:cart        # 🛒 Cart tests
npm run test:checkout    # 💳 Checkout tests
npm run test:products    # 📦 Product tests
```

### Specific Test File

```bash
npx playwright test tests/auth/login.spec.ts
npx playwright test tests/checkout/place-order.spec.ts
```

---

## 📊 Reporting

### Available Reports

| Report | Command | Description |
|--------|---------|-------------|
| HTML Report | `npm run report` | Playwright built-in HTML report with screenshots |
| Allure Report | `npm run report:allure` | Advanced analytics with charts & history |
| JSON Results | — | Auto-generated at `test-results/results.json` |

### Generate Reports

```bash
# Open Playwright HTML report
npm run report

# Generate & open Allure report
npm run report:allure

# Generate Allure report only (no auto-open)
npm run allure:generate

# Open existing Allure report
npm run allure:open
```

### Report Features

| Feature | Trigger |
|---------|---------|
| 📸 Screenshots | Captured on failure |
| 📹 Video Recording | Captured on first retry |
| 🔍 Trace Viewer | Available on first retry |
| 📊 Allure Analytics | Generated every run |

---

## ⚙️ CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline is configured in `.github/workflows/playwright-ci.yml` with the following stages:

```
┌─────────────┐     ┌─────────────────────────┐     ┌─────────────────┐
│  Lint &      │────▶│  Playwright Tests        │────▶│  Publish Report │
│  Type Check  │     │  (Matrix: Cr/Ff/Wk)     │     │  (GitHub Pages) │
└─────────────┘     └─────────────────────────┘     └─────────────────┘
                     ┌─────────────────────────┐
                     │  Smoke Tests             │
                     │  (main branch only)      │
                     └─────────────────────────┘
```

### Pipeline Triggers

| Trigger | Condition |
|---------|-----------|
| Push | `main`, `master`, `develop` branches |
| Pull Request | Against `main`, `master`, `develop` |
| Manual | Workflow dispatch with tag & browser selection |

### Pipeline Features

- **Matrix Strategy** — Parallel execution across Chromium, Firefox, WebKit
- **Lint Gate** — TypeScript type check must pass before tests run
- **Smoke Tests** — Automatic smoke suite on pushes to `main`
- **Artifact Upload** — HTML reports & test results retained for 14 days
- **GitHub Pages** — Auto-publish merged test report to GitHub Pages

---

## 📐 Industrial Standards Applied

| Standard | Implementation |
|----------|---------------|
| **Page Object Model** | All UI interactions encapsulated in page classes |
| **DRY Principle** | Abstract base class with shared utilities |
| **Single Responsibility** | Each page class handles exactly one page |
| **Dependency Injection** | Playwright fixtures for automatic page injection |
| **Data Separation** | Test data fully decoupled from test logic |
| **Environment Config** | `.env` for environment-specific values |
| **Cross-browser Testing** | Chromium, Firefox, WebKit support |
| **CI/CD Integration** | GitHub Actions with matrix strategy |
| **Multi-layer Reporting** | HTML + Allure + JSON reporters |
| **Auto-retry** | Configurable retry on failure (CI: 2, Local: 1) |
| **Evidence Capture** | Screenshots on failure, video on retry |
| **Trace Viewer** | Full execution trace on first retry |
| **Type Safety** | TypeScript with strict configuration |
| **Code Quality** | ESLint with TypeScript rules |
| **Tag-based Execution** | `@smoke`, `@regression`, `@auth`, `@cart`, etc. |
| **Parallel Execution** | Configurable workers (CI: 1, Local: 2) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-test`)
3. Commit your changes (`git commit -m 'feat: add new test case'`)
4. Push to the branch (`git push origin feature/new-test`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
