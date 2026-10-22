import { Page, Locator } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly accountMenu: Locator;
  readonly allMenu: Locator;
  readonly drawer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.locator('#nav-link-accountList');
    this.allMenu = page.locator('#nav-hamburger-menu');
    this.drawer = page.getByRole('dialog').locator('#hmenu-content');
  }

  async hoverAccountMenu() {
    await this.accountMenu.hover();
  }

  // The visible dropdown link has a real href; the hidden shortcut link uses javascript:void(0)
  async hoverAndSelect(linkName: string) {
    await this.accountMenu.hover();
    await this.page
      .locator('a[href*="order-history"]')
      .filter({ hasText: linkName })
      .first()
      .click();
  }

  async openAllMenu() {
    await this.allMenu.click();
    await this.drawer.waitFor({ state: 'visible' });
  }

  // Click an item in the panel that is currently showing (main category or sub-category)
  async clickMenuItem(name: string) {
    await this.page
      .locator('.hmenu-visible')
      .getByText(name, { exact: true })
      .first()
      .click();
  }
}