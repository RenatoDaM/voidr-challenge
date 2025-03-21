import { type Locator, type Page } from '@playwright/test';
import { Header } from '../components/header';
import { InventoryItem } from '../components/products/inventory-item';
import { PRODUCTS_PAGE_URL } from 'constants/routes';
import { Footer } from 'components/footer';

export class ProductsPage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;
    readonly productSortContainer: Locator;
    readonly pageTitle: Locator;
    readonly inventoryList: Locator;
    readonly inventoryItem: InventoryItem;
    readonly header: Header;
    readonly footer: Footer;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
        this.productSortContainer = page.getByTestId('product-sort-container');
        this.pageTitle = page.getByTestId('title');
        this.inventoryList = page.getByTestId('inventory-list');
        this.inventoryItem = new InventoryItem(page);
        this.header = new Header(page);
        this.footer = new Footer(page);
    }

    async goto() {
        await this.page.goto(PRODUCTS_PAGE_URL);
    }

    async sortProducts(sortOption: SortOptionEnum) {
        await this.productSortContainer.click();
        await this.productSortContainer.selectOption(sortOption)
    }

    async navigateToProductDetailsByTitleLink(productTitle: string) {
        await this.inventoryList.getByTestId('inventory-item-name').filter({ hasText: productTitle }).click();
    }
}

// An enum works better here since test-ids in saucedemo are static, unique to each of the six products. 
// In dynamic e-commerce platforms (e.g., Kabum, Shopee), all test-ids are the same due to their dynamic nature, requiring 
// workarounds like selecting by index, text, or other methods. But here, we can just use their "test-id" directly.
export enum ProductsEnum {
    Backpack = 'sauce-labs-backpack',
    BikeLight = 'sauce-labs-bike-light',
    BoltShirt = 'sauce-labs-bolt-t-shirt',
    Jacket = 'sauce-labs-fleece-jacket',
    Onesie = 'sauce-labs-onesie',
    TestAllThingsShirt = 'test.allthethings()-t-shirt-(red)'
}

export enum SortOptionEnum {
    NameAscending = 'az',
    NameDescending = 'za',
    PriceAscending = 'lohi',
    PriceDescending = 'hilo',
}