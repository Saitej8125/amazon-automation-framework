import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I hover over Account and Lists', async function (this: CustomWorld) {
  await this.nav.hoverAccountMenu();
});

When('I select {string} from the account menu',
  async function (this: CustomWorld, linkName: string) {
    await this.nav.hoverAndSelect(linkName);
  });

When('I open the All menu', async function (this: CustomWorld) {
  await this.nav.openAllMenu();
});

When('I click the {string} menu item',
  async function (this: CustomWorld, name: string) {
    await this.nav.clickMenuItem(name);
  });

Then('the Sign in link should be visible', async function (this: CustomWorld) {
  await expect(this.page.getByRole('link', { name: 'Sign in' }).first()).toBeVisible();
});

Then('I should be on the sign-in page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/signin/);
});

Then('the page should mention {string}',
  async function (this: CustomWorld, text: string) {
    await expect(this.page.locator('body')).toContainText(new RegExp(text, 'i'));
  });