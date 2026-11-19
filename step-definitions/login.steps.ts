import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import loginData from '../test-data/login.json';

When('I open the sign-in page from the header', async function (this: CustomWorld) {
  await this.login.openFromHome();
});

When('I continue with an empty sign-in field', async function (this: CustomWorld) {
  await this.login.continueButton.click();
});

When('I continue with the {string} value from test data',
  async function (this: CustomWorld, key: string) {
    const value = (loginData as Record<string, string>)[key];
    await this.login.submitEmail(value);
  });

Then('the sign-in email field should be visible', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/signin/);
  await expect(this.login.emailField).toBeVisible();
});

Then('the sign-in page heading should say {string}',
  async function (this: CustomWorld, text: string) {
    await expect(this.login.heading).toContainText(text);
  });

Then('the sign-in message should say {string}',
  async function (this: CustomWorld, text: string) {
    await expect(this.login.alertBox).toContainText(text);
    await expect(this.page).toHaveURL(/signin/);
  });

// Only specific wording counts here; generic words like "create account" are always on the page.
Then('Amazon should say no account was found or offer to create one',
  async function (this: CustomWorld) {
    const pattern =
      /looks like you are new to amazon|cannot find an account|no account found|account not found/i;
    await expect
      .poll(
        async () => (await this.page.locator('body').innerText()).replace(/\s+/g, ' '),
        { timeout: 15000 }
      )
      .toMatch(pattern);
    console.log('No-account page URL:', this.page.url());
  });