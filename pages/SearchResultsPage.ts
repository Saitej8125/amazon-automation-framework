import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.results = page.locator('[data-component-type="s-search-result"]'); // Locator for search result items
  }

  // Product may open in the same tab or a new tab, so handle both
  async openFirstProduct(): Promise<Page> { // promise<Page> is the return type, 
  // indicating that this function returns a Promise that resolves to a Page object

    const link = this.results.first().locator('a:has(h2)').first(); // Locator for the first product link
    const [newPage] = await Promise.all([ // Wait for a new page to open, if it does
      this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null), // Wait for a new page to open, with a timeout of 5 seconds. If no new page opens, catch the error and return null
      link.click(), // Click the first product link
    ]);
    const target = newPage ?? this.page; // If no new page opened, use the current page
    await target.waitForLoadState('domcontentloaded'); // Wait for the target page to finish loading
    return target; // Return the target page, which is either the new page or the current page
  }
}