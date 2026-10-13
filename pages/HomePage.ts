import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly cartIcon: Locator;
  readonly accountMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.cartIcon = page.locator('#nav-cart');
    this.accountMenu = page.locator('#nav-link-accountList');
  }

  async open() {
    await this.page.goto('/');
  }

  async searchByClick(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  async searchByEnter(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.page.keyboard.press('Enter');
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async hoverAccountMenu() {
    await this.accountMenu.hover();
  }
}