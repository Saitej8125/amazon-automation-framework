import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { NavigationPage } from '../pages/NavigationPage';
import { FiltersPage } from '../pages/FiltersPage';
import { PracticePage } from '../pages/PracticePage';
import * as fs from 'fs';

setDefaultTimeout(60 * 1000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false, slowMo: 300 });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({
    baseURL: 'https://www.amazon.in',
    locale: 'en-IN',
    recordVideo: { dir: 'reports/videos' },
  });
  this.page = await this.context.newPage();          // must come before the lines below
  this.home = new HomePage(this.page);
  this.results = new SearchResultsPage(this.page);
  this.nav = new NavigationPage(this.page);
  this.filters = new FiltersPage(this.page);
  this.practice = new PracticePage(this.page);
});
After(async function (this: CustomWorld, scenario) {
  const video = this.page ? this.page.video() : null;
  if (this.page) {
    if (scenario.result?.status === Status.FAILED) {
      const screenshot = await this.page.screenshot();
      this.attach(screenshot, 'image/png');
    }
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();   // the video file is finished when the context closes
  }
  if (video) {
    const videoPath = await video.path();
    if (fs.existsSync(videoPath)) {
      this.attach(fs.readFileSync(videoPath), 'video/webm');
    }
  }
});

AfterAll(async function () {
  await browser.close();
});