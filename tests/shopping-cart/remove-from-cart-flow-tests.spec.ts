import { test, expect } from '@test-configuration';
import { ProductsEnum } from '@page-objects/products-page';
import productsData from '@resources/data/products-data.json'

test('TC_013 should remove product from cart page', async ({ populatedShoppingCartPage }) => {
    await populatedShoppingCartPage.inventoryItem.removeFromCart(ProductsEnum.Backpack);
    await expect(populatedShoppingCartPage.cartList.filter({ hasText: productsData.productTitles.backpack })).not.toBeVisible()
});

test('TC_014 should remove product from cart on product details page', async ({ populatedShoppingCartPage }) => {
    const productTitle = productsData.productTitles.boltShirt;
    await populatedShoppingCartPage.navigateToProductDetailsByTitleLink(productTitle);
    await populatedShoppingCartPage.inventoryItem.removeFromCartButton.click();
    await populatedShoppingCartPage.goto();
    await expect(populatedShoppingCartPage.cartList.filter({ hasText: productTitle })).not.toBeVisible()
});

test('TC_015 should remove product from cart on products page', async ({ populatedShoppingCartPage, productsPage }) => {
    await productsPage.inventoryItem.removeFromCart(ProductsEnum.BikeLight);
    await populatedShoppingCartPage.goto();
    await expect(populatedShoppingCartPage.cartList.filter({ hasText: productsData.productTitles.bikeLight })).not.toBeVisible()
});

test('TC_016 should retain product in cart after page reload', async ({ populatedShoppingCartPage }) => {
    await expect(populatedShoppingCartPage.cartList.filter({ hasText: productsData.productTitles.backpack })).toBeVisible()
    await expect(populatedShoppingCartPage.cartList.filter({ hasText: productsData.productTitles.bikeLight })).toBeVisible()
    await expect(populatedShoppingCartPage.cartList.filter({ hasText: productsData.productTitles.boltShirt })).toBeVisible()
});