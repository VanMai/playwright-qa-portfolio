import { test, expect } from '@playwright/test';  // This is foundational statement that brings in Playwright's core testing library 
// so you can write and validate your test cases.

test.describe('Lesson 22 practice — XPath Locators', () => { 

    const baseURL = 'https://www.saucedemo.com/';

    // This runs before each test to open the application
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('1st - Open SauceDemo webpage', async ({ page }) => {
        await expect(page).toHaveURL(baseURL);
    });

    test('2nd - Swag Labs Logo (relative XPath)', async ({ page }) => {
		// Absolute XPath has been tested and result shows that it's fragile or brittle
        const swagLabsLogo = page.locator("xpath=//div[@class='login_logo']"); // This is Relative XPath
        await expect(swagLabsLogo).toBeVisible();  // Expect the logo to be visible
    });

    test('3rd - Login (using and/or and starts-with())', async ({ page }) => {
        await page.locator("xpath=//input[@id='user-name' or @data-test='username']").fill('standard_user');
        await page.locator("xpath=//input[starts-with(@id,'pass')]").fill('secret_sauce');
        await page.locator("xpath=//input[@id='login-button' and @type='submit']").click();

        await expect(page.getByText('Products')).toBeVisible();

    });

    test('4th - Exactly 2 T-Shirt items (found using contains())', async ({ page }) => {
        await page.locator("xpath=//input[@id='user-name' or @data-test='username']").fill('standard_user');
        await page.locator("xpath=//input[starts-with(@id,'pass')]").fill('secret_sauce');
        await page.locator("xpath=//input[@id='login-button' and @type='submit']").click();

        // const shirt = page.locator("xpath=//input[contains(@inventory_item,'T-Shirt')]"); WRONG SYNTAX
        const shirt = page.locator("xpath=//div[@class='inventory_item' and contains(.,'T-Shirt')]") // Correct Syntax
		
		const firstItem = shirt.locator('.inventory_item_name').nth(0);
        await expect(firstItem).toHaveText('Sauce Labs Bolt T-Shirt');
		
		const secondItem = shirt.locator('.inventory_item_name').nth(1);
		await expect(secondItem).toHaveText('Test.allTheThings() T-Shirt (Red)');

		const count = await shirt.count();
        expect(count).toBe(2);

    });

    test('5th - The first Social Media Link (X) using starts-with() and first()', async ({ page }) => {
        await page.locator("xpath=//input[@id='user-name' or @data-test='username']").fill('standard_user');
        await page.locator("xpath=//input[starts-with(@id,'pass')]").fill('secret_sauce');
        await page.locator("xpath=//input[@id='login-button' and @type='submit']").click();

        // 1. Locate the "X" button by starts-with() and first()
        const twitterLink = page.locator("xpath=//a[starts-with(@data-test,'social')]").first();

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

    test('6th - The second Social Media Link (Facebook) using starts-with() and nth()', async ({ page }) => {
        await page.locator("xpath=//input[@id='user-name' or @data-test='username']").fill('standard_user');
        await page.locator("xpath=//input[starts-with(@id,'pass')]").fill('secret_sauce');
        await page.locator("xpath=//input[@id='login-button' and @type='submit']").click();

        // 1. Locate the "f" button by by starts-with() and nth()
        const facebookLink = page.locator("xpath=//a[starts-with(@data-test,'social')]").nth(1);

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

    test('7th - The third Social Media Link (LinkedIn) using last()/position() and starts-with()', async ({ page }) => {
        await page.locator("xpath=//input[@id='user-name' or @data-test='username']").fill('standard_user');
        await page.locator("xpath=//input[starts-with(@id,'pass')]").fill('secret_sauce');
        await page.locator("xpath=//input[@id='login-button' and @type='submit']").click();

        // 1. Locate the "in" button by starts-with() and last()
        const linkedInLink = page.locator("xpath=//a[starts-with(@data-test,'social')]").last();

        // Check whether href points to LinkedIn page of Sauce Labs
        await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');

        // Check whether target points to '_blank' (so that after clicking, a new tab is opened in the web browser)
        await expect(linkedInLink).toHaveAttribute('target', '_blank');

    });

    test('8th - About section using text()', async ({ page }) => {
        await page.locator("xpath=//input[@id='user-name' or @data-test='username']").fill('standard_user');
        await page.locator("xpath=//input[starts-with(@id,'pass')]").fill('secret_sauce');
        await page.locator("xpath=//input[@id='login-button' and @type='submit']").click();

        // 1. Click the Burger Button on top left of the website first
        // await page.locator('#react-burger-menu-btn').click(); OLD CODES
        await page.locator("xpath=//button[@id='react-burger-menu-btn']").click();

        // 2. Locate the "About" section by text()
        const aboutLink = page.locator("xpath=//a[text()='About']");

        // 3. Wait for the URL of "About" section to appear in the same tab of web browser:
        await expect(aboutLink).toBeVisible();

        // 4. Click "About" section, then verify whether URL of the same tab is exactly what is expected URL
        await aboutLink.click();
        await expect(page).toHaveURL('https://saucelabs.com/');

    });  

    test('9th - Logout using text()', async ({ page }) => {
        await page.locator("xpath=//input[@id='user-name' or @data-test='username']").fill('standard_user');
        await page.locator("xpath=//input[starts-with(@id,'pass')]").fill('secret_sauce');
        await page.locator("xpath=//input[@id='login-button' and @type='submit']").click();

        // 1. Click the Burger Button on top left of the website first
        await page.locator("xpath=//button[@id='react-burger-menu-btn']").click();

        // 2. Locate the "Logout" section by text()
        const logOutLink = page.locator("xpath=//a[text()='Logout']");

        // 3. Wait for the URL to appear in the same tab of web browser after clicking "Logout":
        await expect(logOutLink).toBeVisible();

        // 4. Click "Logout" section, then verify whether URL of the same tab is exactly what is expected URL
        await logOutLink.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        const userNameField = page.locator('#user-name');
        await expect(userNameField).toBeVisible();

    }); 

});