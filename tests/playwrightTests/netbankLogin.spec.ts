import { test, expect } from '@playwright/test';

test.setTimeout(60000); // Set test timeout to 60 seconds
import { NetbankLoginPage } from '../../pages/netbankLoginPage';

test('Netbank full user flow', async ({ page }) => {
  const loginPage = new NetbankLoginPage(page);
  // Valid login and navigation
  await loginPage.goto();
  await loginPage.login('81990618', 'Password750');
  await loginPage.navigateHome();
  await loginPage.viewAccounts();
  await loginPage.offersAndApply();
  await loginPage.logoff();
  await page.close();
});

test('Login with invalid credentials should show error', async ({ page }) => {
  const loginPage = new NetbankLoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalidUser', 'invalidPass');
  const errorMsg = await loginPage.getErrorMessage();
  await expect(errorMsg).not.toBeNull();
  await page.close();
});

test('Logoff should redirect to login page', async ({ page }) => {
  const loginPage = new NetbankLoginPage(page);
  await loginPage.goto();
  await loginPage.login('81990618', 'Password750');
  await loginPage.logoff();
  await page.close();
});