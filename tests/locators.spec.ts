import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// Same element (search box), found 5 different ways
test('Search box - 5 locator styles', async ({ page }) => {
  await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
  await expect(page.locator('input[name="field-keywords"]')).toBeVisible();
  await expect(page.locator("//input[@id='twotabsearchtextbox']")).toBeVisible();
  await expect(page.getByPlaceholder('Search Amazon.in')).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Search Amazon.in' })).toBeVisible();
});

// TC_HOME_001, TC_CART_009
test('Header elements are visible', async ({ page }) => {
  await expect(page.locator('#nav-logo-sprites')).toBeVisible();
  await expect(page.locator('#nav-cart')).toBeVisible();
  await expect(page.locator('#nav-hamburger-menu')).toBeVisible();
  await expect(page.locator('#nav-link-accountList')).toBeVisible();
});

// TC_SRCH_001
test('Search using the icon', async ({ page }) => {
  await page.locator('#twotabsearchtextbox').fill('laptop');
  await page.locator('#nav-search-submit-button').click();
  await expect(page).toHaveURL(/k=laptop/);
});

// TC_NAV_001
test('Hover on Account & Lists', async ({ page }) => {
  await page.locator('#nav-link-accountList').hover();
  await expect(page.getByRole('link', { name: 'Sign in' }).first()).toBeVisible();
});

// TC_CART_009
test('Cart icon opens the cart page', async ({ page }) => {
  await page.locator('#nav-cart').click();
  await expect(page).toHaveURL(/cart/);
});