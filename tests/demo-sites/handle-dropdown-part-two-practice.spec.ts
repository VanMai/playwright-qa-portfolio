import { test, expect } from '@playwright/test';

test.describe('Lesson 26 practice — Handle Dropdown List (Part 2)', () => { 

    test('1st - Bootstrap hidden dropdown', async ({ page }) => { // On OrangeHRM website
        // 1. Open the OrangeHRM Demo website and check whether Login Heading is visible
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

        // 2. Fill in username field as Admin
        await page.locator('input[name="username"]').fill('Admin');
        await expect(page.locator('input[name="username"]')).toHaveValue('Admin');

        // 3. Fill in password field as admin123
        await page.locator('input[name="password"]').fill('admin123');
        await expect(page.locator('input[name="password"]')).toHaveValue('admin123');

        // 4. Click on Login button to log in, and check whether PIM Menu is visible
        await page.locator('button[type="submit"]').click();
        await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();

        // 5. Click on PIM Menu
        await page.getByRole('link',{name:'PIM'}).click();

        // 6. Click on Job Title dropdown so that dropdown options will be visible
        const jobTitleDropDown = page.locator('.oxd-input-group').filter({ hasText: 'Job Title' }); // Find EXACT section for "Job Title"

        await jobTitleDropDown.locator('i').click(); // Click on the Dropdown

        // 7. check dropdown options are visible
        const options = page.locator("div[role='listbox'] span"); //capturing the dropdown options
        await expect(options.first()).toBeVisible();

        // 8. Count how many options.
        const count = await options.count();

        // 9. Get all of these options' text and print all of them
        const optionTexts = await options.allTextContents();
        console.log("Dropdown options:", optionTexts);

        // 10. In each option: if textContent() is exactly the selected role, then click on this option before break.
        for(let i=0;i<count;i++){
            const option= options.nth(i);
            let optionText=await option.textContent(); // use "let" instead of "const" for purpose of trim later
            if(optionText != null){ // Only trim if the optionText is not null.
                optionText = optionText.trim();
            }
            console.log(optionText);

            if(optionText==='QA Engineer'){
                await option.click();
                break;
            }
        }
        // 11. Check whether under "Job Title" section, the displayed option is exactly the selected role
        await expect(jobTitleDropDown.locator('.oxd-select-text-input')).toHaveText('QA Engineer');

    }); 

    test('2nd - innerText() vs textContent()', async ({ page }) => { // On Demo Web Shop website

        await page.goto('https://demowebshop.tricentis.com/');

        const products = page.locator('.product-title'); // List of Product titles 

        console.log(await products.nth(1).innerText()); // Print only visible text by innerText()

        console.log(await products.nth(1).textContent()); // Print all text (including spaces) by textContent()

        const text=await products.nth(1).textContent();

        if(text!==null && text!==undefined){ // 1st Way to Print the trimmed version only if text is not null
            console.log(text.trim())
        }

        console.log(text?.trim()); // 2nd Way to Print the trimmed version only if text is not null

        expect(text?.trim()).toBe('14.1-inch Laptop'); // Another way to write: await expect(products.nth(1)).toHaveText('14.1-inch Laptop');
        
    }); 

    test('3rd - allInnerTexts() vs allTextContents() vs all()', async ({ page }) => { // On Demo Web Shop website

        await page.goto('https://demowebshop.tricentis.com/');
        const products = page.locator('.product-title'); // List of Product titles 


        // Use allInnerTexts() vs allTextContents()

        let productNames = await products.allInnerTexts(); // Use allInnerTexts() to trim the text & remove whitespaces and new lines.
        console.log("Product Names captured by allInnerTexts(): ", productNames);

        productNames = await products.allTextContents(); // Use allTextContents(): whitespaces still exist.
        console.log("Product Names captured by allTextContents(): ", productNames); 

        const trimmedProductNames= productNames.map((text) => text?.trim()); // Trim whitespaces in productNames due to allTextContents().
        console.log("Product Names after trimmed: ", trimmedProductNames);


        // Use all()
        const productLocators = await products.all(); 

        for(let prodloc of productLocators){ // Use for loop to examine each individual Locator Array.
            console.log(await prodloc.innerText()); // Use innerText() to print only visible text.
        }

        // Check whether number of elements in list of Product Names (after trimmed) is 6, because there are total 6 Featured Products.
        expect(trimmedProductNames.length).toBe(6);

        // Check whether in list of Product Names (after trimmed), there is a Product called "14.1-inch Laptop"
        expect(trimmedProductNames).toContain("14.1-inch Laptop");

    }); 

    test('4th - Autosuggest dropdown', async ({ page }) => { // On Flipkart website
        // Navigate to Flipkart page
        await page.goto("https://www.flipkart.com/");

        // Wait for the Flipkart page to load
        await page.waitForTimeout(3000);

        // Close the Login Popup if it appears
        const closeButton = page.getByText("✕", { exact: true });

        console.log("Visibility check:", await closeButton.isVisible());

        if (await closeButton.isVisible()) { // Click Close button to close Login Popup
            await closeButton.click();
        }

        // Locate the search box and enter the search text
        const searchBox = page.locator("input[name='q']").first();

        await expect(searchBox).toBeVisible();
        await searchBox.fill("smartphone"); // Enter "smartphone" in the search box

        // Wait for auto suggestions to appear after filling in "smartphone" in the search box
        await page.waitForTimeout(5000);

        // Locate all auto-suggest options
        // Wait until auto-suggestions are displayed
        const options = page.locator("ul > li");
        await expect(options.first()).toBeVisible();

        // Verify suggestions are displayed
        const count = await options.count();
        console.log("Number of suggested options:", count);

        expect(count).toBeGreaterThan(0);

        // Print the 5th suggestion (if available)
        if (count > 5) {
            console.log("5th option:", await options.nth(5).innerText());
        }

        // Print all auto-suggestion values
        console.log("Printing all auto suggestions...");
        for (let i = 0; i < count; i++) {
            console.log(await options.nth(i).textContent());
        }

        // Select the "smartphones" option
        let optionFound = false;

        for (let i = 0; i < count; i++) {

            const text = (await options.nth(i).innerText()).trim();

            if (text === "smartphones") {
                await options.nth(i).click(); // For result == "smartphones": click this result
                optionFound = true;
                break; // After clicking the result with "smartphones": break.
            }
        }

        // Verify the required option (in this case: "smartphones") was found
        expect(optionFound).toBeTruthy();

        // Verify the search URL contains the selected search term
        await expect(page).toHaveURL(/smartphones/i);

        // Verify the search box contains the selected value (in this case: "smartphones")
        await expect(searchBox).toHaveValue("smartphones");

    }); 

});