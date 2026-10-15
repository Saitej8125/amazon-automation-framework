import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I am on the Amazon home page', async function (this: CustomWorld) {
  await this.home.open();
});

When('I search for {string} using the Enter key',
  async function (this: CustomWorld, keyword: string) {
    await this.home.searchByEnter(keyword);
  });

Then('the page title should contain {string}',
  async function (this: CustomWorld, text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text));
  });

Then('the search box should be visible', async function (this: CustomWorld) {
  await expect(this.home.searchBox).toBeVisible();
});

Then('the URL should contain {string}',
  async function (this: CustomWorld, text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  });