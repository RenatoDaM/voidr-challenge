import { expect, test } from '@test-configuration';
import { ProductsPage, SortOptionEnum } from '@page-objects/products-page';
import { getPricesFromLocator } from '@utils/price-utils';
import { ANY_TEXT_REGEX } from '@utils/regex-utils';

test('TC_006 list all products', async ({ productsPage }) => {
    await verifyInventoryItemsContent(productsPage);
});

test('TC_007 order all products by price ascending', async ({ productsPage }) => {
    await productsPage.sortProducts(SortOptionEnum.PriceAscending);
    
    const prices = await getPricesFromLocator(productsPage.inventoryItem.price);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    await expect(prices).toEqual(sortedPrices);
    await verifyInventoryItemsContent(productsPage);
});

test('TC_008 order all products by name ascending', async ({ productsPage }) => {
    await productsPage.sortProducts(SortOptionEnum.NameAscending);
    
    const names = await productsPage.inventoryItem.name.allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    
    await expect(names).toEqual(sortedNames);
    await verifyInventoryItemsContent(productsPage);
});

async function verifyInventoryItemsContent(productsPage: ProductsPage) {
    const expectedProductCountFirstPage = 6;
    await expect(productsPage.inventoryItem.root).toHaveCount(expectedProductCountFirstPage);
    const inventoryItem = productsPage.inventoryItem
    for (let i = 0; i < expectedProductCountFirstPage; i++) {
        await expect(inventoryItem.name.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.description.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.price.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.addToCartButton.nth(i)).toBeVisible();
        await expect(inventoryItem.image.nth(i)).toBeVisible();
    }
}