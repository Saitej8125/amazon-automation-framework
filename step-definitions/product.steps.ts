import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ProductPage } from '../pages/ProductPage';

When('I open the first product', async function (this: CustomWorld) {
  const productTab = await this.results.openFirstProduct();
  this.product = new ProductPage(productTab);
});

Then('the product title should be visible', async function (this: CustomWorld) {
  await expect(this.product.title).toBeVisible();
});

Then('the Add to Cart button should be visible', async function (this: CustomWorld) {
  await expect(this.product.addToCartButton).toBeVisible();
});