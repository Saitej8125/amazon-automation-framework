import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  home!: HomePage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);