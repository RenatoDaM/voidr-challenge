import { type Locator, type Page } from '@playwright/test';
import { ProductsEnum } from '@page-objects/products-page';
import texts from '@resources/page-texts/en.json'

export class InventoryItem {
    readonly page: Page;
    readonly root: Locator;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;
    readonly image: Locator;
    readonly quantity: Locator;
    readonly removeFromCartButton: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.getByTestId('inventory-item');
        this.description = page.getByTestId('inventory-item-desc');
        this.name = page.getByTestId('inventory-item-name');
        this.price = page.getByTestId('inventory-item-price');
        this.image = this.root.getByRole('img');
        this.quantity = page.getByTestId('item-quantity');
        this.removeFromCartButton = this.root.getByRole('button', { name: texts.cartPage.removeFromCartButton })
        this.addToCartButton = this.root.getByRole('button', { name: texts.cartPage.addToCartButton })
    }

    async addToCart(product: ProductsEnum) {
        await this.page.getByTestId(`add-to-cart-${product}`).click();
    }
    
    async removeFromCart(product: ProductsEnum) {
        await this.page.getByTestId(`remove-${product}`).click();
    }
    
    async getRemoveButtonFromProduct(product: ProductsEnum): Promise<Locator> {
        return this.page.getByTestId(`remove-${product}`);
    }
}