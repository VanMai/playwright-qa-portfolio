import { test, expect } from '@playwright/test';

test.describe('Lesson 21 practice — CSS Locators', () => { 

    const baseURL = 'https://www.saucedemo.com/';

    // This runs before each test to open the application
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('1st - Open SauceDemo webpage', async ({ page }) => {
        await expect(page).toHaveURL(baseURL);
    });

    test('2nd - Verify Swag Labs Logo Visibility', async ({ page }) => {
		const logoText = page.getByText('Swag Labs')
        await expect(logoText).toBeVisible();
    });

    test('3rd - Log in as a standard user', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page.getByText('Products')).toBeVisible();
    });

    test('4th - Find Products Containing "T-Shirt"', async ({ page }) => {
		await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
		
		const shirt = page.locator('.inventory_item').filter({ has: page.getByText('T-Shirt') });
		
		const firstItem = shirt.locator('.inventory_item_name').nth(0);
        await expect(firstItem).toHaveText('Sauce Labs Bolt T-Shirt');
		
		const secondItem = shirt.locator('.inventory_item_name').nth(1);
		await expect(secondItem).toHaveText('Test.allTheThings() T-Shirt (Red)');

		const count = await shirt.count();
        expect(count).toBe(2);
    });

    test('5th - Verify the 1st Social Media Link - should be X', async ({ page }) => {
		await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // 1. Locate the "X" button by data-test attribute (this is the best locator which is least brittle)
        const twitterLink = page.locator('a[data-test="social-x"]');

        // 2. Clicking the "X" button and pop-up tab is opened.
        // Use Promise.all to ensure that action of opening new tab is caught immediately when it has just happened.
        const [newTab] = await Promise.all([ 
        page.waitForEvent('popup'), // Wait until a new tab appears
        twitterLink.click()         // Activate the action of clicking "X" button
        ]);

        // 3. Wait for the new tab to finish loading the URL or network status completely
        await newTab.waitForLoadState();

        // 4. Verify whether URL of the new tab is exactly what is expected URL
        await expect(newTab).toHaveURL('https://x.com/saucelabs');
		
    });

    test('6th - Verify the 2nd Social Media Link - should be Facebook', async ({ page }) => {
		await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // 1. Locate the "f" button by data-test attribute
        const facebookLink = page.locator('a[data-test="social-facebook"]');

        // 2. Clicking the "f" button and pop-up tab is opened.
        // Use Promise.all to ensure that action of opening new tab is caught immediately when it has just happened.
        const [newTab] = await Promise.all([ 
        page.waitForEvent('popup'), // Wait until a new tab appears
        facebookLink.click()         // Activate the action of clicking "f" button
        ]);

        // 3. Wait for the new tab to finish loading the URL or network status completely
        await newTab.waitForLoadState();

        // 4. Verify whether URL of the new tab is exactly what is expected URL
        await expect(newTab).toHaveURL('https://www.facebook.com/saucelabs');
		
    });

    test('7th - Verify the 3rd Social Media Link - should be LinkedIn', async ({ page }) => {
		await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // 1. Locate the "in" button by data-test attribute
        const linkedInLink = page.locator('a[data-test="social-linkedin"]');

        // Because previous codes make this test fail (it takes 30.1 seconds to run the test), 
        // these below new codes are used for replacement:

        // Check whether href points to LinkedIn page of Sauce Labs
        await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');

        // Check whether target points to '_blank' (so that after clicking, a new tab is opened in the web browser)
        await expect(linkedInLink).toHaveAttribute('target', '_blank');
		
    });

    test('8th - Able to access About section', async ({ page }) => {
		await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // 1. Click the Burger Button on top left of the website first
        await page.locator('#react-burger-menu-btn').click();

        // 2. Locate the "About" section by data-test attribute
        const aboutLink = page.locator('a[data-test="about-sidebar-link"]');

        // 3. Wait for the URL of "About" section to appear in the same tab of web browser:
        await expect(aboutLink).toBeVisible();

        // 4. Click "About" section, then verify whether URL of the same tab is exactly what is expected URL
        await aboutLink.click();
        await expect(page).toHaveURL('https://saucelabs.com/');
		
    });

    test('9th - Able to log out', async ({ page }) => {
		await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // 1. Click the Burger Button on top left of the website first
        await page.locator('#react-burger-menu-btn').click();

        // 2. Locate the "Logout" section by data-test attribute
        const logOutLink = page.locator('a[data-test="logout-sidebar-link"]');

        // 3. Wait for the URL to appear in the same tab of web browser after clicking "Logout":
        await expect(logOutLink).toBeVisible();

        // 4. Click "Logout" section, then verify whether URL of the same tab is exactly what is expected URL
        await logOutLink.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        const userNameField = page.locator('#user-name');
        await expect(userNameField).toBeVisible();
		
    });
});