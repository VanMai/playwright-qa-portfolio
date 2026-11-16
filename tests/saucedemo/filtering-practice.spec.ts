import { test, expect } from '@playwright/test';

test.describe('Lesson 20 practice — filtering locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('P-01 filter by hasText — find Sauce Labs Backpack', async ({ page }) => {
    const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpack).toHaveCount(1);
    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('P-02 filter by has — find the $49.99 item', async ({ page }) => {
    const jacket = page.locator('.inventory_item').filter({ has: page.getByText('$49.99') });
    await expect(jacket.locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');
  });

  test('P-03 sort Z to A — .first() changes, filter does not', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('za');
    const firstAfterSort = page.locator('.inventory_item').first();
    await expect(firstAfterSort.locator('.inventory_item_name')).toHaveText('Test.allTheThings() T-Shirt (Red)');
    const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpack.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });
});
