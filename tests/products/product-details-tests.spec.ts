import { test, expect } from '@test-configuration';
import { ANY_TEXT_REGEX } from '@utils/regex-utils';
import productData from '@resources/data/products-data.json'

test('TC_009 visualize product details', async ({ productsPage }) => {
    await productsPage.navigateToProductDetailsByTitleLink(productData.productTitles.backpack);
    const product = productsPage.inventoryItem;
    await expect(product.name).toHaveText(ANY_TEXT_REGEX);
    await expect(product.description).toHaveText(ANY_TEXT_REGEX);
    await expect(product.price).toHaveText(ANY_TEXT_REGEX);
    await expect(product.addToCartButton).toBeVisible();
    await expect(product.image).toBeVisible();
});
