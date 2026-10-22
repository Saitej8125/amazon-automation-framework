import { Page, Locator } from '@playwright/test';

export class FiltersPage {
  readonly page: Page;
  readonly brandPanel: Locator;
  readonly sortSelect: Locator;
  readonly organicResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandPanel = page.locator('#brandsRefinements');
    this.sortSelect = page.locator('#s-result-sort-select');
    // results that are not marked Sponsored
    this.organicResults = page
      .locator('[data-component-type="s-search-result"]')
      .filter({ hasNotText: /Sponsored/i });
  }

  async selectBrand(brand: string) {
    await this.brandPanel.getByText(brand, { exact: true }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

   // The real <select> is hidden, so use the visible dropdown like a user would
  async sortBy(optionText: string) {
    await this.page
      .locator('.a-button-dropdown')
      .filter({ hasText: /Sort by/i })
      .first()
      .click();
    await this.page
      .locator('a.a-dropdown-link')
      .filter({ hasText: optionText })
      .first()
      .click();
    await this.page.waitForURL(/[?&]s=/);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async firstPrices(count: number): Promise<number[]> {
    const texts = await this.organicResults
      .locator('.a-price:not(.a-text-price) .a-offscreen')
      .allTextContents();
    return texts
      .map((t) => Number(t.replace(/[^0-9.]/g, '')))
      .filter((n) => n > 0)
      .slice(0, count);
  }
}