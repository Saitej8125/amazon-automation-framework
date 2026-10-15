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
      const link = this.results.nth(i).locator('a:has(h2)').first();
      if ((await link.count()) === 0) continue;

      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
        link.click(),
      ]);
      const target = newPage ?? this.page;
      await target.waitForLoadState('domcontentloaded');

      const hasButton = await target
        .locator('#add-to-cart-button')
        .waitFor({ state: 'visible', timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      if (hasButton) return target;

      if (newPage) await newPage.close();
      else await this.page.goBack();
    }
    throw new Error('No product with an Add to Cart button in the first results');
  }
}