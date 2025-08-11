# Copilot Instructions for AUTOMATIONDEMO

This codebase is an end-to-end test automation suite using Playwright and TypeScript, focused on browser-based workflows for web applications (notably Netbank login flows). Follow these guidelines to maximize productivity as an AI coding agent:

## Architecture Overview
- **Tests** are organized in `e2e/` (examples) and `tests/` (main specs, including Netbank login and API tests).
- **Page Object Models** live in `pages/`, encapsulating selectors and actions for maintainable test code.
- **Configuration** is managed in `playwright.config.ts`.
- **Reports** are generated in `playwright-report/` (HTML) and `test-results/` (raw data).
- **Artillery** is used for performance/load testing via YAML specs in `tests/nftArtilleryTests/`.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Initialize Playwright:** `npm init playwright@latest`
- **Run all tests:** `npx playwright test`
- **Run a specific test:** `npx playwright test tests/netbankLogin.spec.ts --headed`
- **Artillery tests:** `npx artillery run tests/nftArtilleryTests/netbankLoginAtrillery.yml`
- **Artillery reporting:** The `report` command is deprecated; view JSON results directly or upload to Artillery Cloud.

## Project-Specific Patterns
- **Page Object Model:** All page interactions should be abstracted in `pages/` (see `netbankLoginPage.ts`).
- **Test Contexts:** Shared context/config lives in `testcontexts/`.
- **Specs:** Main Playwright specs are in `tests/playwrightTests/` and API specs in `tests/playwrightApiTests/`.
- **Performance:** Artillery YAML specs and results are in `tests/nftArtilleryTests/`.

## Integration Points
- **Playwright** for browser automation.
- **Artillery** for load/performance testing.
- **HTML Reports:** Generated automatically after Playwright runs.

## Conventions
- Use TypeScript for all automation code.
- Organize tests by type and feature (see directory structure above).
- Abstract selectors and flows in Page Object Models for reuse.
- Store raw results and reports in dedicated folders for easy access.

## Examples
- To add a new login flow test, create a new spec in `tests/playwrightTests/` and a corresponding page object in `pages/`.
- For performance tests, add a YAML spec in `tests/nftArtilleryTests/` and run with Artillery CLI.

## Key Files & Directories
- `playwright.config.ts`: Playwright setup
- `pages/netbankLoginPage.ts`: Example Page Object
- `tests/netbankLogin.spec.ts`: Main Netbank login test
- `tests/nftArtilleryTests/netbankLoginAtrillery.yml`: Artillery performance spec

---

If any workflow or pattern is unclear, ask for clarification or examples from the codebase.
