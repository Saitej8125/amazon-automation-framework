import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Homepage';

test.describe('Smoke tests', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.open();
  });

  test('TC_HOME_001 Home page loads with search box @smoke', async ({ page }) => {
    await expect(page).toHaveTitle(/Amazon/);
    await expect(home.searchBox).toBeVisible();
  });

  test('TC_SRCH_001 Search by clicking the icon @smoke', async ({ page }) => {
    await home.searchByClick('iphone');
    await expect(page).toHaveURL(/k=iphone/);
  });

  test('TC_SRCH_002 Search by pressing Enter @smoke', async ({ page }) => {
    await home.searchByEnter('laptop');
    await expect(page).toHaveURL(/k=laptop/);
  });

  test('TC_CART_009 Cart icon opens the cart @smoke', async ({ page }) => {
    await home.openCart();
    await expect(page).toHaveURL(/cart/);
  });
});