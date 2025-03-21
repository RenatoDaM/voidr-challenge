import { test, expect } from '@test-configuration';

test('TC_026 should navigate to products page by sidebar menu link', async ({ productsPage, shoppingCartPage }) => {
    await shoppingCartPage.header.navigateToInventory();
    await expect(productsPage.inventoryList).toBeVisible();
    await expect(productsPage.header.aboutSidebarLink).not.toBeVisible();
    await expect(productsPage.header.inventorySidebarLink).not.toBeVisible();
});

test('TC_027 should close sidebar menu', async ({ productsPage, shoppingCartPage }) => {
    await shoppingCartPage.header.openSidebar();
    await expect(productsPage.header.aboutSidebarLink).toBeVisible();
    await expect(productsPage.header.inventorySidebarLink).toBeVisible();

    await productsPage.header.closeSidebar();
    await expect(productsPage.header.aboutSidebarLink).not.toBeVisible();
    await expect(productsPage.header.inventorySidebarLink).not.toBeVisible();
});

test('TC_028 should do logout by sidebar menu link', async ({ loginPage, shoppingCartPage }) => {
    await shoppingCartPage.header.logout();
    await expect(loginPage.loginContainer).toBeVisible();
});