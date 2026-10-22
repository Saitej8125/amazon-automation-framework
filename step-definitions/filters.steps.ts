import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

const sortOptions: Record<string, string> = {
  'Price: Low to High': 'price-asc-rank',
  'Price: High to Low': 'price-desc-rank',
};

When('I select the brands', async function (this: CustomWorld, table: DataTable) {
  for (const brand of table.raw().flat()) {
    await this.filters.selectBrand(brand);
  }
});

When('I sort the results by {string}',
  async function (this: CustomWorld, option: string) {
    await this.filters.sortBy(sortOptions[option]);
  });

Then('the first prices should be mostly in ascending order',
  async function (this: CustomWorld) {
    console.log('URL after sort:', this.page.url());
    await expect(this.filters.sortSelect).toHaveValue('price-asc-rank');

    const prices = await this.filters.firstPrices(5);
    console.log('Prices checked:', prices.join(', '));
    expect(prices.length).toBeGreaterThan(1);

    // allow for the odd item that Amazon places out of order
    let inOrder = 0;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] >= prices[i - 1]) inOrder++;
    }
    expect(inOrder / (prices.length - 1)).toBeGreaterThanOrEqual(0.75);
  });