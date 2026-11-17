import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page, APIResponse } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { NavigationPage } from '../pages/NavigationPage';
import { FiltersPage } from '../pages/FiltersPage';
import { PracticePage } from '../pages/PracticePage';


export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  home!: HomePage;
  results!: SearchResultsPage;
  product!: ProductPage;
  nav!: NavigationPage;
  filters!: FiltersPage;
  practice!: PracticePage;
  newWindow?: Page;
  alertMessage = '';
  blocksBefore = 0;
  apiResponse?: APIResponse;
  apiBody: any = null;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);