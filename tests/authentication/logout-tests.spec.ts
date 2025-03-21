import { test, expect } from '@test-configuration';

test('TC_029 should not access shopping cart after logout', async ({ loginPage, populatedShoppingCartPage }) => {
    populatedShoppingCartPage.header.logout();
    await expect(loginPage.loginContainer).toBeVisible();

    populatedShoppingCartPage.goto();
    await expect(populatedShoppingCartPage.cartList).not.toBeVisible();
    await expect(loginPage.errorComponent.errorContainer).toBeVisible();
});