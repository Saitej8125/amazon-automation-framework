import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';

async function openFirstLaptop(page: Page): Promise<ProductPage> {
  const home = new HomePage(page);
  await home.open();
  await home.searchByEnter('laptop');
  const results = new SearchResultsPage(page);
  await expect(results.results.first()).toBeVisible();
  const productTab = await results.openFirstProduct();
  return new ProductPage(productTab);
}

test.describe('Product and cart', () => {
  test('TC_PROD_001 Open a product from results @smoke', async ({ page }) => {
    const product = await openFirstLaptop(page);
    await expect(product.title).toBeVisible();
  });

  test('TC_PROD_002 Product page shows title and Add to Cart @smoke', async ({ page }) => {
    const product = await openFirstLaptop(page);
    await expect(product.title).toBeVisible();
    await expect(product.addToCartButton).toBeVisible();
    // YOUR TASK: find the price locator with codegen and add a price assertion
  });

  test('TC_CART_001 Add a product to the cart @smoke', async ({ page }) => {
    const product = await openFirstLaptop(page);
    await product.addToCart();
    await expect(product.cartCount).toHaveText('1');
  });
});