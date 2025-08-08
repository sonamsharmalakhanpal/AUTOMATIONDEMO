import { Page, expect } from '@playwright/test';

export class NetbankLoginPage {
  readonly page: Page;
  // Unique selectors for login page elements
  readonly usernameInput = '#txtMyClientNumber';
  readonly passwordInput = '#txtMyPassword';
  readonly loginButton = '#btnLogon';
  readonly errorMessage = '#lblError';
  readonly myHomeLink = "role=link[name='My home'][exact=true]";
  readonly viewAccountsLink = "role=link[name='View accounts']";
  readonly offersApplyLink = "role=link[name='Offers & apply']";
  readonly logoffLink = "role=link[name='\uE003Log off']";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    // Open the target web application
    await this.page.goto('https://www.my.commbank.com.au/netbank/Logon/Logon.aspx?ei=mv_logon-NB');
  }

  async login(username: string, password: string) {
    // Fill username and password, then click login
    await this.page.getByRole('textbox', { name: 'Client number' }).click();
    await this.page.getByRole('textbox', { name: 'Client number' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Log on' }).click();
  }

  async navigateHome() {
  const homeLink = this.page.getByRole('link', { name: 'My home', exact: true });
  await expect(homeLink).toBeVisible(); // Assert 'My home' link is visible
  await homeLink.click();
  }

  async viewAccounts() {
  const accountsLink = this.page.getByRole('link', { name: 'View accounts' });
  await expect(accountsLink).toBeVisible(); // Assert 'View accounts' link is visible
  if (await accountsLink.isVisible()) {
    await accountsLink.click();
  }
  }

  async offersAndApply() {
  const offersLink = this.page.getByRole('link', { name: 'Offers & apply' });
  await expect(offersLink).toBeVisible(); // Assert 'Offers & apply' link is visible
  await offersLink.click();
  }

  async logoff() {
  const logoffLink = this.page.getByRole('link', { name: 'Log off' });
  if (await logoffLink.isVisible()) {
    await logoffLink.click();
  }
  }

  async getErrorMessage() {
  // Get error message if login fails
  await this.page.waitForSelector('h3');
  return await this.page.textContent('h3');
  }
}
