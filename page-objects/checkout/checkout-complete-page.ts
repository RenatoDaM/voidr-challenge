import { type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly checkoutCompleteContainer: Locator;
    readonly successImage: Locator;
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.checkoutCompleteContainer = page.getByTestId('checkout-complete-container');
        this.successImage = page.getByTestId('pony-express');
        this.completeHeader = page.getByTestId('complete-header');
        this.backHomeButton = page.getByTestId('back-to-products');
    }
}