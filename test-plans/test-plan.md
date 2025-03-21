# Test Plan

# Prerequisites

#### Test Data
The following entities need to be already persisted before the test execution:

Products with titles: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)

Users: standard_user, problem_user, locked_out_user

# Test Cases

## TC_001 - Login with valid credentials, existing user

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the login page.                                             |                          |
| 2. Enter an existing username.                                        | Username: "standard_user" |
| 3. Enter a valid password.                                            | Password: "secret_sauce"  |
| 4. Click the login button.                                            |                          |

**Expected Result**:
- The user is redirected to the product page.
- The product catalog (home page) is visible.

---

## TC_002 - Login with invalid credentials, non-existing user

| Steps                                                                | Given Input               |
|----------------------------------------------------------------------|---------------------------|
| 1. Access the login page.                                             |                           |
| 2. Enter a non-existing username.                                     | Username: "non_existent_user" |
| 3. Enter a valid password.                                            | Password: "secret_sauce"    |
| 4. Click the login button.                                            |                           |

**Expected Result**:
- Error message: "User not found" or similar.
- The user is not redirected to the home page.

---

## TC_003 - Login with empty password

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the login page.                                             |                          |
| 2. Enter a valid username.                                            | Username: "standard_user" |
| 3. Leave the password field empty.                                    | Password: ""              |
| 4. Click the login button.                                            |                          |

**Expected Result**:
- An error component is displayed.
- The user is not redirected to the home page.

---

## TC_004 - Login with a locked user

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the login page.                                             |                          |
| 2. Enter a locked username.                                           | Username: "locked_out_user" |
| 3. Enter the correct password.                                        | Password: "secret_sauce"  |
| 4. Click the login button.                                            |                          |

**Expected Result**:
- An error component is displayed.
- **Error message explaining that the user is locked is shown.**
- The user is not redirected to the home page.

---

## TC_005 - Logout

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the home page after logging in.                             |                          |
| 2. Open the side menu.                                                |                          |
| 3. Click the logout button.                                           |                          |

**Expected Result**:
- The user is redirected to the login page.
- Authentication state is cleared.

---

## TC_006 - List all products

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the products page.                                          |                          |

**Expected Result**:
- The product list is displayed correctly.

---

## TC_007 - Sort products by ascending price order

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the products page.                                          |                          |
| 2. Click the option to sort products by ascending price.              |                          |

**Expected Result**:
- The product list is displayed correctly.
- Products are displayed in ascending price order.

---

## TC_008 - Sort products by ascending alphabetical order

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the products page.                                          |                          |
| 2. Click the option to sort products by name in ascending alphabetical order. |                          |

**Expected Result**:
- The product list is displayed correctly.
- Products are displayed in ascending alphabetical order.

---

## TC_009 - View product details

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the products page.                                          |                          |
| 2. Click on a product from the list.                                  | Sauce Labs Backpack      |

**Expected Result**:
- The product details page is displayed correctly.

---

## TC_010 - Add item to cart from the home page

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the home page.                                              |                          |
| 2. Click the add to cart button on a product.                         | Sauce Labs Backpack      |

**Expected Result**:
- The item is added to the cart.
- The cart badge shows the number of items.
- The remove from cart button is visible.
- The added item is visible on the cart page.

---

## TC_011 - Add 6 items to the cart

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the products page.                                          |                          |
| 2. Add 6 items to the cart.                                           | Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red) |

**Expected Result**:
- 6 items are added to the cart.
- The cart badge shows the number of items.
- The remove from cart button is visible.
- The added items are visible on the cart page.

---

## TC_012 - Add item to cart from the product details page

**Prerequisites**
- Logged in with valid user.
- Product titled "Sauce Labs Bike Light" pre-registered.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the product details page.                                   | Sauce Labs Bike Light    |
| 2. Click the add to cart button.                                      |                          |

**Expected Result**:
- The item is added to the cart.
- The cart badge shows the number of items.
- The remove from cart button is visible.
- The added item is visible on the cart page.

---

## TC_013 - Remove item from cart from the cart page

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the cart page.                                              |                          |
| 2. Click the remove button for a product in the cart.                 | Sauce Labs Backpack      |

**Expected Result**:
- The item is removed from the cart.
- The cart badge shows the number of items.
- The removed item is no longer visible on the cart page.

---

## TC_014 - Remove item from cart from the product details page

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the product details page.                                   | Sauce Labs Bolt T-Shirt  |
| 2. Click the remove button for the item in the cart.                  | Sauce Labs Bolt T-Shirt  |

**Expected Result**:
- The item is removed from the cart.
- The cart badge shows the number of items.
- The removed item is no longer visible on the cart page.

---

## TC_015 - Remove item from cart from the home page

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Access the home page.                                              |                          |
| 2. Click the cart icon.                                               | Sauce Labs Bike Light    |
| 3. Remove an item from the cart.                                      | Sauce Labs Bike Light    |

**Expected Result**:
- The item is removed from the cart.
- The cart badge shows the number of items.
- The removed item is no longer visible on the cart page.

---

## TC_016 - Items remain in the cart after page reload

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Reload the page.                                                  |                          |
| 2. Check the cart contents.                                           |                          |

**Expected Result**:
- The items remain in the cart after the reload.
- The cart badge shows the number of items.

---

## TC_017 - Complete purchase of 4 products

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Proceed to checkout.                                              | First Name: "John"       |
|                                                                      | Last Name: "Doe"         |
|                                                                      | Postal code: "90210"     |
| 2. Complete the purchase.                                            |                          |

**Expected Result**:
- No error component is visible.
- Success image is displayed.
- Success message is displayed.
- The purchase is completed successfully.

---

## TC_018 - Attempt to complete purchase with no products

**Prerequisites**
- Logged in with valid user.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Navigate to the cart page.                                         |                          |
| 2. Proceed to checkout.                                              |                          |

**Expected Result**:
- An error component is visible.
- Unable to proceed to checkout after clicking the checkout button.

---

## TC_019 - Attempt to purchase with invalid Zip/Postal Code

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Proceed to checkout.                                              | First Name: "Jane"       |
|                                                                      | Last Name: "Smith"       |
|                                                                      | Postal code: "@ç"        |

**Expected Result**:
- An error component is visible.
- Unable to proceed to checkout after clicking the checkout button.

---

## TC_020 - Attempt to purchase without providing a first name

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Proceed to checkout.                                              | First Name: ""           |
|                                                                      | Last Name: "Doe"         |
|                                                                      | Postal code: "90210"     |

**Expected Result**:
- An error component is visible.
- Error message indicating that the first name is required.

---

## TC_021 - Attempt to purchase without providing a Zip/Postal Code

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Proceed to checkout.                                              | First Name: "Katarina"   |
|                                                                      | Last Name: "Silva"       |
|                                                                      | Postal code: ""          |

**Expected Result**:
- An error component is visible.
- Error message indicating that the postal code is required.

---

## TC_022 - Complete checkout with all fields blank

**Prerequisites**
- Logged in with valid user.
- Pre-populated cart.

| Steps                                                                | Given Input              |
|----------------------------------------------------------------------|--------------------------|
| 1. Proceed to checkout.                                              | First Name: "   "        |
|                                                                      | Last Name: "    "        |
|                                                                      | Postal code: "   "       |

**Expected Result**:
- An error component is visible.
- Error message indicating that all fields must not be blank.

---

## TC_023 - Cancel Purchase on "Checkout: Your Information" (First Step of Checkout)

**Preconditions**
- Logged in with a valid user.
- Cart pre-populated.

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Navigate to the cart page.                                           |                           |
| 2. Click on the "Checkout" button.                                      |                           |
| 3. On the first step of the checkout page, click the cancel button.     |                           |

**Expected result**:
- The user is redirected to the cart page.
- The purchase is not completed.
- Items remain in the cart.

---

## TC_024 - Cancel Purchase on the Final Confirmation Step (Overview Checkout)

**Preconditions**
- Logged in with a valid user.
- Cart pre-populated.

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Proceed with checkout.                                               | First Name: "John"        |
|                                                                        | Last Name: "Doe"          |
|                                                                        | Postal code: "90210"      |
| 2. Cancel at the second step of checkout.                               |                           |

**Expected result**:
- The user is redirected to the product page.
- The purchase is not completed.
- Items remain in the cart.

---

## TC_025 - Access Checkout Final Page Directly via URL with 

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the checkout URL directly.                                    |                           |

**Expected result**:
- The checkout page displays an error message stating the need to pass through all steps.

---

## TC_026 - Return to the Home Page Using the Sidebar Menu

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the cart page.                                                |                           |
| 2. Click on the sidebar menu and select "All Products."                 |                           |

**Expected result**:
- The user is redirected to the home page.

---

## TC_027 - Close the Sidebar Menu

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the home page.                                                |                           |
| 2. Open the sidebar menu.                                               |                           |
| 3. Close the sidebar menu.                                              |                           |

**Expected result**:
- The sidebar menu is closed correctly.

---

## TC_028 - Log Out via the Sidebar Menu

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the home page after logging in.                               |                           |
| 2. Open the sidebar menu.                                               |                           |
| 3. Click on the log out option in the sidebar menu.                     |                           |

**Expected result**:
- The user is redirected to the login page.
- The authentication state is cleared.

---

## TC_029 - Access Cart After Logging Out

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Log out.                                                             |                           |
| 2. Try to access the cart directly via URL.                             |                           |

**Expected result**:
- The system redirects the user to the login page with an error message, as the user is logged out.

---

## TC_030 - Redirect to LinkedIn

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the home page.                                                |                           |
| 2. Click on the LinkedIn icon in the page footer.                       |                           |

**Expected result**:
- The user is redirected to the LinkedIn page.

---

## TC_031 - Redirect to Facebook

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the home page.                                                |                           |
| 2. Click on the Facebook icon in the page footer.                       |                           |

**Expected result**:
- The user is redirected to the Facebook page.

---

## TC_032 - Redirect to Twitter

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the home page.                                                |                           |
| 2. Click on the Twitter icon in the page footer.                        |                           |

**Expected result**:
- The user is redirected to the Twitter page.

---

## TC_033 - Add 100 Quantities of the Same Product to the Cart

| Steps                                                                   | Given data                |
|------------------------------------------------------------------------|---------------------------|
| 1. Access the product page.                                             |                           |
| 2. Add 100 quantities of a product to the cart.                         | Product: "Product_A"      |
|                                                                        | Quantity: 100             |

**Expected result**:
- The cart displays 100 units of the product.

---