import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly emailField: Locator;
  readonly continueButton: Locator;
  readonly alertBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /sign in or create account/i });
    this.emailField = page.locator('input[name="email"], #ap_email, #ap_email_login').first();
    this.continueButton = page.locator('#continue').first();
    // only alert boxes you can actually see (Amazon keeps hidden empty ones in the page)
    this.alertBox = page
      .locator('.a-alert-content:visible, #auth-error-message-box:visible')
      .first();
  }

  async openFromHome() {
    await this.page.locator('#nav-link-accountList').click();
    try {
      await this.emailField.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
      throw new Error(
        `Sign-in field not found. Page title: "${await this.page.title()}" URL: ${this.page.url()}`
      );
    }
  }

  async submitEmail(value: string) {
    await this.emailField.fill(value);
    await this.continueButton.click();
  }
}