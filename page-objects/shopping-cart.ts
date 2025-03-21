import { type Locator, type Page } from '@playwright/test';
import { ProductsEnum } from './products-page';
import { InventoryItem } from '../components/products/inventory-item';
import { Header } from '../components/header';
import { SHOPPING_CART_URL } from 'constants/routes';

export class ShoppingCartPage {
    readonly page: Page;
    readonly inventoryItem: InventoryItem;
    readonly header: Header;
    readonly pageTitle: Locator;
    readonly quantityLabel: Locator;
    readonly descriptionLabel: Locator;
    readonly cartList: Locator;
    readonly removeFromCartButton: Locator;
    readonly itemQuantity: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItem = new InventoryItem(page)
        this.header = new Header(page)
        this.pageTitle = page.getByTestId('title');
        this.quantityLabel = page.getByTestId('cart-quantity-label');
        this.descriptionLabel = page.getByTestId('cart-desc-label');
        this.cartList = page.getByTestId('cart-list');
        this.itemQuantity = page.getByTestId('item-quantity');
        this.checkoutButton = page.getByTestId('checkout');
        this.continueShoppingbutton = page.getByTestId('continue-shopping');
        this.removeFromCartButton = this.cartList.getByRole('button');
    }

    async goto() {
        await this.page.goto(SHOPPING_CART_URL);
    }

    async navigateToProductDetailsByTitleLink(productTitle: string) {
        await this.cartList.getByTestId('inventory-item-name').filter({ hasText: productTitle }).click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async emptyCart() {
        let removeButtons;
    
        do {
            removeButtons = await this.removeFromCartButton.all();
            if (removeButtons.length === 0) break;
            await removeButtons[0].click();
        } while (removeButtons.length > 0);
    }
}