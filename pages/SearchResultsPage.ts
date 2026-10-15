import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.results = page.locator('[data-component-type="s-search-result"]');
  }

  // Product may open in the same tab or a new tab, so handle both
  async openFirstProduct(): Promise<Page> {
    const link = this.results.first().locator('a:has(h2)').first();
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
      link.click(),
    ]);
    const target = newPage ?? this.page;
    await target.waitForLoadState('domcontentloaded');
    return target;
  }

  // Tries the first results in order and returns the first product that has Add to Cart
  async openFirstProductWithAddToCart(maxTries = 5): Promise<Page> {
    for (let i = 0; i < maxTries; i++) {
      // make sure the results list is on screen (important after going back)
      await this.results.first().waitFor({ state: 'visible', timeout: 10000 });

      const link = this.results.nth(i).locator('a:has(h2)').first();
      if ((await link.count()) === 0) {
        console.log(`Result ${i + 1}: no product link, skipping`);
        continue;
      }

      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
        link.click(),
      ]);
      const target = newPage ?? this.page;
      await target.waitForLoadState('domcontentloaded');

      const hasButton = await target
        .locator('#add-to-cart-button')
        .waitFor({ state: 'visible', timeout: 8000 })
        .then(() => true)
        .catch(() => false);
      console.log(`Result ${i + 1}: Add to Cart ${hasButton ? 'found' : 'missing'} - ${target.url()}`);
      if (hasButton) return target;

      if (newPage) {
        await newPage.close();
      } else {
        await this.page.goBack();
        await this.page.waitForLoadState('domcontentloaded');
      }
    }
    throw new Error('No product with an Add to Cart button in the first results');
  }
}