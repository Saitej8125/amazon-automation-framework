import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';
import { HomePage } from '../pages/HomePage';

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
  this.page = await this.context.newPage();
  this.home = new HomePage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});