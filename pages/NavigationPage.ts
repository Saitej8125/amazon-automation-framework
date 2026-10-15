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
    this.drawer = page.locator('#hmenu-content');   // verify with codegen
  }

  async hoverAccountMenu() {
    await this.accountMenu.hover();
  }

  // hover first, then click a link inside the menu that appears
  async hoverAndSelect(linkName: string) {
    await this.accountMenu.hover();
    await this.page.getByRole('link', { name: linkName }).first().click();
  }

  async openAllMenu() {
    await this.allMenu.click();
    await this.drawer.waitFor({ state: 'visible' });
  }

  // used for the main category and the sub-category (nested links)
  async clickMenuItem(name: string) {
    await this.drawer.getByText(name, { exact: true }).first().click();
  }
}