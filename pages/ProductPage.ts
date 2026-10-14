import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page; // The 'page' property is of type 'Page', which represents a single tab or window in the browser.
  //  It is used to interact with the web page, such as navigating, clicking elements, and retrieving information.
  readonly title: Locator;
  readonly addToCartButton: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page; // The constructor takes a 'Page' object as an argument and assigns it to the 'page' property of the class.
    this.title = page.locator('span#productTitle');
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.cartCount = page.locator('#nav-cart-count');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}