import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://www.amazon.in',
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'retain-on-failure',
    locale: 'en-IN',
    launchOptions: { slowMo: 500 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});