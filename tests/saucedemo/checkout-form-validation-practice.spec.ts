import { test, expect } from '@playwright/test';

test.describe('Lesson 24 practice — Form Validations in Checkout Page', () => { 

    const baseURL = 'https://www.saucedemo.com/';

    // This runs before each test to open the application
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('1st - only First Name field is left empty', async ({ page }) => { 
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // Check if there is one item with the expected name
        const onesieItem = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' });
        await expect(onesieItem).toHaveCount(1); // Expect there is one item with exact name.

        // Click "Add to cart" button to add this item to the shopping cart
        await onesieItem.getByRole('button', { name: 'Add to cart' }).click();

        // Ensure that after adding, Shopping Cart has 1 item now
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click the Shopping Cart icon on top right to proceed to Checkout
        await page.locator('.shopping_cart_link').click();
        await expect(page.getByText('Your Cart')).toBeVisible(); // After clicking, "Your Cart" phrase is shown on top left.

        // Click "Checkout" button to go to the Checkout Page
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Identify 3 fields (First Name, Last Name and Zip/Postal Code) and Submit button
        const firstNameField = page.getByPlaceholder('First Name');
        const lastNameField = page.getByPlaceholder('Last Name');
        const postalCodeField = page.getByPlaceholder('Zip/Postal Code');
        const continueButton = page.getByRole('button', { name: 'Continue' }).first();

        // Ensure that only First Name field is left empty, while the other 2 fields are filled in
        await expect(firstNameField).toBeVisible();
        await firstNameField.fill('');
        await expect(firstNameField).toHaveValue('');

        await expect(lastNameField).toBeVisible();
        await lastNameField.fill('Lee');
        await expect(lastNameField).toHaveValue('Lee');

        await expect(postalCodeField).toBeVisible();
        await postalCodeField.fill('120606');
        await expect(postalCodeField).toHaveValue('120606');

        // Click Continue button
        await continueButton.click();

        // Expect an Error message for First Name field to be visible
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Error: First Name is required');

    });   

    test('2nd - only Last Name field is left empty', async ({ page }) => { 
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // Check if there is one item with the expected name
        const onesieItem = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' });
        await expect(onesieItem).toHaveCount(1); // Expect there is one item with exact name.

        // Click "Add to cart" button to add this item to the shopping cart
        await onesieItem.getByRole('button', { name: 'Add to cart' }).click();

        // Ensure that after adding, Shopping Cart has 1 item now
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click the Shopping Cart icon on top right to proceed to Checkout
        await page.locator('.shopping_cart_link').click();
        await expect(page.getByText('Your Cart')).toBeVisible(); // After clicking, "Your Cart" phrase is shown on top left.

        // Click "Checkout" button to go to the Checkout Page
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Identify 3 fields (First Name, Last Name and Zip/Postal Code) and Submit button
        const firstNameField = page.getByPlaceholder('First Name');
        const lastNameField = page.getByPlaceholder('Last Name');
        const postalCodeField = page.getByPlaceholder('Zip/Postal Code');
        const continueButton = page.getByRole('button', { name: 'Continue' }).first();

        // Ensure that only Last Name field is left empty, while the other 2 fields are filled in
        await expect(firstNameField).toBeVisible();
        await firstNameField.fill('Catherine');
        await expect(firstNameField).toHaveValue('Catherine');

        await expect(lastNameField).toBeVisible();
        await lastNameField.fill('');
        await expect(lastNameField).toHaveValue('');

        await expect(postalCodeField).toBeVisible();
        await postalCodeField.fill('330064');
        await expect(postalCodeField).toHaveValue('330064');

        // Click Continue button
        await continueButton.click();

        // Expect an Error message for Last Name field to be visible
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Error: Last Name is required');

    });  

    test('3rd - only Zip/Postal Code field is left empty', async ({ page }) => { 
        // Log in first
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // Check if there is one item with the expected name
        const onesieItem = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' });
        await expect(onesieItem).toHaveCount(1); // Expect there is one item with exact name.

        // Click "Add to cart" button to add this item to the shopping cart
        await onesieItem.getByRole('button', { name: 'Add to cart' }).click();

        // Ensure that after adding, Shopping Cart has 1 item now
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click the Shopping Cart icon on top right to proceed to Checkout
        await page.locator('.shopping_cart_link').click();
        await expect(page.getByText('Your Cart')).toBeVisible(); // After clicking, "Your Cart" phrase is shown on top left.

        // Click "Checkout" button to go to the Checkout Page
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Identify 3 fields (First Name, Last Name and Zip/Postal Code) and Submit button
        const firstNameField = page.getByPlaceholder('First Name');
        const lastNameField = page.getByPlaceholder('Last Name');
        const postalCodeField = page.getByPlaceholder('Zip/Postal Code');
        const continueButton = page.getByRole('button', { name: 'Continue' }).first();

        // Ensure that only Zip/Postal Code field is left empty, while the other 2 fields are filled in
        await expect(firstNameField).toBeVisible();
        await firstNameField.fill('Elizabeth');
        await expect(firstNameField).toHaveValue('Elizabeth');

        await expect(lastNameField).toBeVisible();
        await lastNameField.fill('Taylor');
        await expect(lastNameField).toHaveValue('Taylor');

        await expect(postalCodeField).toBeVisible();
        await postalCodeField.fill('');
        await expect(postalCodeField).toHaveValue('');

        // Click Continue button
        await continueButton.click();

        // Expect an Error message for Zip/Postal Code field to be visible
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Error: Postal Code is required');

    }); 

});