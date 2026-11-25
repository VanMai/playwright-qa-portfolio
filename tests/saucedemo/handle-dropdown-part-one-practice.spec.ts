import { test, expect } from '@playwright/test';

test.describe('Lesson 25 practice — Handle Dropdown List (Part 1)', () => { 

    const baseURL = 'https://www.saucedemo.com/';

    // This runs before each test to open the application
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('1st - Sort by Name (A to Z)', async ({ page }) => {
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        const dropdownSelect = page.locator('.product_sort_container');
        await expect(dropdownSelect).toBeVisible();

        // Default selection should be "Name (A to Z)"
        await expect(dropdownSelect).toHaveValue('az');

        // Select the Dropdown list
        await dropdownSelect.selectOption({ label: 'Name (A to Z)' }); // Select by label
        await expect(dropdownSelect).toHaveValue('az');

        // Result after Sorting
        const firstAfterSort = page.locator('.inventory_item').first();
        await expect(firstAfterSort.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
        const lastAfterSort = page.locator('.inventory_item').last();
        await expect(lastAfterSort.locator('.inventory_item_name')).toHaveText('Test.allTheThings() T-Shirt (Red)');

    }); 

    test('2nd - Sort by Name (Z to A)', async ({ page }) => {
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        const dropdownSelect = page.locator('.product_sort_container');
        await expect(dropdownSelect).toBeVisible();

        // Default selection should be "Name (A to Z)"
        await expect(dropdownSelect).toHaveValue('az');

        // Select the Dropdown list
        await dropdownSelect.selectOption({ value: 'za' }); // Select by value
        await expect(dropdownSelect).toHaveValue('za');

        // Result after Sorting
        const firstAfterSort = page.locator('.inventory_item').first();
        await expect(firstAfterSort.locator('.inventory_item_name')).toHaveText('Test.allTheThings() T-Shirt (Red)');
        const lastAfterSort = page.locator('.inventory_item').last();
        await expect(lastAfterSort.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    }); 

    test('3rd - Sort by Price (low to high)', async ({ page }) => {
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        const dropdownSelect = page.locator('.product_sort_container');
        await expect(dropdownSelect).toBeVisible();

        // Default selection should be "Name (A to Z)"
        await expect(dropdownSelect).toHaveValue('az');

        // Select the Dropdown list
        await dropdownSelect.selectOption({ index: 2 }); // Select by index
        await expect(dropdownSelect).toHaveValue('lohi');

        // Result after Sorting
        const firstAfterSort = page.locator('.inventory_item').first();
        await expect(firstAfterSort.locator('.inventory_item_price')).toHaveText('$7.99');
        const lastAfterSort = page.locator('.inventory_item').last();
        await expect(lastAfterSort.locator('.inventory_item_price')).toHaveText('$49.99');

    }); 

    test('4th - Sort by Price (high to low)', async ({ page }) => {
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        const dropdownSelect = page.locator('.product_sort_container');
        await expect(dropdownSelect).toBeVisible();

        // Default selection should be "Name (A to Z)"
        await expect(dropdownSelect).toHaveValue('az');

        // Select the Dropdown list
        await dropdownSelect.selectOption({ value: 'hilo' }); // Select by value
        await expect(dropdownSelect).toHaveValue('hilo');

        // Result after Sorting
        const firstAfterSort = page.locator('.inventory_item').first();
        await expect(firstAfterSort.locator('.inventory_item_price')).toHaveText('$49.99');
        const lastAfterSort = page.locator('.inventory_item').last();
        await expect(lastAfterSort.locator('.inventory_item_price')).toHaveText('$7.99');

    }); 

});
