import { Page, Locator } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly accountMenu: Locator;
  readonly allMenu: Locator;
  readonly openPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.locator('#nav-link-accountList');
    this.allMenu = page.locator('#nav-hamburger-menu');
    this.openPanel = page.locator('.hmenu-visible').first();
  }

  async hoverAccountMenu() {
    await this.accountMenu.hover();
  }

  // The visible dropdown link has a real href; the hidden shortcut link uses javascript:void(0)
   async hoverAndSelect(linkName: string) {
    const link = this.page
      .locator('a[href*="order-history"]:visible')
      .filter({ hasText: linkName })
      .first();
    for (let attempt = 1; attempt <= 3; attempt++) {
      await this.page.mouse.move(0, 300);          // move away so the hover starts fresh
      await this.accountMenu.hover();
      try {
        await link.waitFor({ state: 'visible', timeout: 5000 });
        await link.click();
        return;
      } catch {
        console.log(`Account menu link not visible on attempt ${attempt}`);
      }
    }
    throw new Error(`"${linkName}" link did not appear in the account menu`);
  }

  // Click the All icon; if the panel does not open, try once more
  async openAllMenu() {
    for (let attempt = 1; attempt <= 2; attempt++) {
      await this.allMenu.click();
      try {
        await this.openPanel.waitFor({ state: 'visible', timeout: 10000 });
        return;
      } catch {
        console.log(`All menu did not open on attempt ${attempt}`);
      }
    }
    throw new Error('All menu did not open after 2 attempts');
  }

  // Click an item in the panel that is currently showing (main category or sub-category)
  async clickMenuItem(name: string) {
    await this.openPanel.getByText(name, { exact: true }).first().click();
  }
}