import { test, expect } from '@playwright/test';// to import the test and expect functions from the playwright/test module

test('Home page load with search box', async ({ page }) => {
    // to define a test case named "Home page load with search box" that takes a page object as an argument

    await page.goto('/');// to navigate to the base URL defined in the playwright.config.ts file
    await expect(page).toHaveTitle(/Amazon.in/);// to check if the title of the page contains "Amazon.in"
    await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
    //to check if the search box is visible on the home page

});

test('Search for a Keyword', async ({ page }) => { 
    //to define a test case named "Search for a Keyword" that takes a page object as an argument

    await page.goto('/'); // to navigate to the base URL defined in the playwright.config.ts file
    await page.locator('#twotabsearchtextbox').fill('iphone'); // to fill the search box with the keyword "iphone"
    await page.keyboard.press('Enter'); // to simulate pressing the Enter key to perform the search

    await expect(page).toHaveURL(/k=iphone/); // to check if the URL of the page contains "k=iphone"

    const results = await page.locator('[data-component-type="s-search-result"]'); 
    // to locate all the search result elements on the page that have the attribute data-component-type="s-search-result"
    
    await expect(results.first()).toBeVisible(); // to check if the first search result is visible on the page

});
