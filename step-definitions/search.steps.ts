import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import searchData from '../test-data/search.json';

When('I search for {string} using the search icon',
  async function (this: CustomWorld, keyword: string) {
    await this.home.searchByClick(keyword);
  });

When('I click the search icon with an empty box', async function (this: CustomWorld) {
  await this.home.searchButton.click();
});

When('I search for the special characters from test data',
  async function (this: CustomWorld) {
    await this.home.searchByEnter(searchData.negative.specialChars);
  });

When('I search for the gibberish text from test data',
  async function (this: CustomWorld) {
    await this.home.searchByEnter(searchData.negative.gibberish);
  });

Then('I should see search results', async function (this: CustomWorld) {
  await expect(this.results.results.first()).toBeVisible();
});

// check the exact wording on the live site if this fails
Then('a no results message should be shown', async function (this: CustomWorld) {
  await expect(this.page.getByText(/No results for/i).first()).toBeVisible();
});