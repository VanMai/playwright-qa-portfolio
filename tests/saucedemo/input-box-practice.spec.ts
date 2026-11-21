import { test, expect } from '@playwright/test';

test.describe('Lesson 23 practice — Input Box', () => { 

    const baseURL = 'https://www.saucedemo.com/';

    // This runs before each test to open the application
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });


    test('1st - Fill in Username and Password at the Login Page', async ({ page }) => { 
        const usernameField = page.getByPlaceholder('Username');
        const passwordField = page.getByPlaceholder('Password');

        // Username field should be visible and accept a value
        await expect(usernameField).toBeVisible();
        await usernameField.fill('standard_user');
        await expect(usernameField).toHaveValue('standard_user');

        // Password field should be visible and accept a value
        await expect(passwordField).toBeVisible();
        await passwordField.fill('secret_sauce');
        await expect(passwordField).toHaveValue('secret_sauce');

    });

    test('2nd - Fill in First Name, Last Name and Zip/Postal Code at the Checkout Page', async ({ page }) => {
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // Check if there is one item with the expected name
        const bikeLight = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
        await expect(bikeLight).toHaveCount(1); // Expect there is one item with exact name.

        // Click "Add to cart" button to add this item to the shopping cart
        await bikeLight.getByRole('button', { name: 'Add to cart' }).click();

        // Ensure that after adding, Shopping Cart has 1 item now
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click the Shopping Cart icon on top right to proceed to Checkout
        await page.locator('.shopping_cart_link').click();
        await expect(page.getByText('Your Cart')).toBeVisible(); // After clicking, "Your Cart" phrase is shown on top left.

        // Click "Checkout" button to go to the Checkout Page
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Fill in First Name, Last Name and Zip/Postal Code
        const firstNameField = page.getByPlaceholder('First Name');
        const lastNameField = page.getByPlaceholder('Last Name');
        const postalCodeField = page.getByPlaceholder('Zip/Postal Code');

        await expect(firstNameField).toBeVisible();
        await firstNameField.fill('Vanessa');
        await expect(firstNameField).toHaveValue('Vanessa');

        await expect(lastNameField).toBeVisible();
        await lastNameField.fill('Mei');
        await expect(lastNameField).toHaveValue('Mei');

        await expect(postalCodeField).toBeVisible();
        await postalCodeField.fill('752352');
        await expect(postalCodeField).toHaveValue('752352');

    });  

});