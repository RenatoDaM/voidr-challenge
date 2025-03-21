import { test, expect } from '@test-configuration';
import { ProductsEnum, ProductsPage } from '@page-objects/products-page';
import { ShoppingCartPage } from '@page-objects/shopping-cart';
import { ANY_TEXT_REGEX } from '../../utils/regex-utils';
import productsData from '@resources/data/products-data.json'

test('TC_010 add backpack product to cart from products page', async ({ shoppingCartPage, productsPage }) => {
    const product = ProductsEnum.Backpack;
    const quantityExpectedInCart = 1;

    await productsPage.inventoryItem.addToCart(product);

    await validateProductsPage(productsPage, quantityExpectedInCart, [product])

    await productsPage.header.navigateToShoppingCartPage();

    await validateCartItems(shoppingCartPage, quantityExpectedInCart);
});

test('TC_011 add 6 products to cart', async ({ shoppingCartPage, productsPage }) => {
    const quantityExpectedInCart = 6

    const products = Object.values(ProductsEnum)

    for (const product of products) {
        await productsPage.inventoryItem.addToCart(product);
    }

    await validateProductsPage(productsPage, quantityExpectedInCart, products)

    await productsPage.header.navigateToShoppingCartPage();

    await validateCartItems(shoppingCartPage, quantityExpectedInCart);
});

test('TC_012 add product to cart from product details page', async ({ shoppingCartPage, productsPage }) => {
    await productsPage.navigateToProductDetailsByTitleLink(productsData.productTitles.bikeLight);
    await productsPage.inventoryItem.addToCartButton.click();
    await expect(productsPage.inventoryItem.removeFromCartButton).toBeVisible();

    await shoppingCartPage.goto();

    await validateCartItems(shoppingCartPage, 1);
    await expect(await productsPage.inventoryItem.getRemoveButtonFromProduct(ProductsEnum.BikeLight)).toBeVisible();
});

async function validateProductsPage(productsPage: ProductsPage, quantityExpectedInCart: number, addedProducts: ProductsEnum[]) {
    const cartBadge = productsPage.header.shoppingCartBadge;
    await expect(cartBadge).toHaveText(quantityExpectedInCart.toString());

    for (const addedProduct of addedProducts) {
        const removeButton = await productsPage.inventoryItem.getRemoveButtonFromProduct(addedProduct);
        await expect(removeButton).toBeVisible();
    }
}

async function validateCartItems(shoppingCartPage: ShoppingCartPage, quantityExpectedInCart: number) {
    const cartBadge = shoppingCartPage.header.shoppingCartBadge;
    await expect(cartBadge).toHaveText(quantityExpectedInCart.toString());

    const inventoryItem = shoppingCartPage.inventoryItem;

    for (let i = 0; i < quantityExpectedInCart; i++) {
        await expect(inventoryItem.name.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.description.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.price.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.quantity.nth(i)).toHaveText("1");
        await expect(inventoryItem.removeFromCartButton.nth(i)).toBeVisible();
    }
}
