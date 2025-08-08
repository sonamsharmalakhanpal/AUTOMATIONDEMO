# AutomationDemo

This project is an end-to-end (E2E) test automation suite built with Playwright. It demonstrates browser automation for web applications, including login flows and navigation, using TypeScript.

## Features
- Automated browser testing using Playwright
- Example tests for public sites and a Netbank login flow
- Page Object Model for maintainable test code
- HTML test reports

## Project Structure
```
├── e2e/                  # Example Playwright specs
│   └── example.spec.ts
├── tests/                # Main test specs (Netbank login flow)
│   └── netbankLogin.spec.ts
├── pages/                # Page Object Models
│   └── netbankLoginPage.ts
├── playwright.config.ts  # Playwright configuration
├── playwright-report/    # HTML test reports
├── test-results/         # Raw test results
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- npm (comes with Node.js)

### Install Dependencies
npm install
npm init playwright@latest


### Run Tests
npx playwright test

## Run single test
npx playwright test tests/netbankLogin.spec.ts --headed


### View Test Report
npx playwright show-report


## Example Test: Netbank Login
See `tests/netbankLogin.spec.ts` for a full login/logout flow using the Page Object Model in `pages/netbankLoginPage.ts`.

## Customization
- Add new tests in the `tests/` or `e2e/` folders.
- Update selectors and flows in the Page Object files under `pages/`.
- Configure browsers and options in `playwright.config.ts`.

## Useful Links
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright Test Reports](https://playwright.dev/docs/test-reporters)

## License
ISC
