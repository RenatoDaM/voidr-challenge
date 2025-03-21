import { type Locator, type Page } from '@playwright/test';

export class ErrorComponent {
    readonly page: Page;
    readonly errorContainer: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorContainer = page.getByTestId('error');
        this.closeButton = page.getByTestId('close-error');
    }

    async closeErrorMessage() {
        await this.closeButton.click();
    }

    async getErrorMessage() {
        return await this.errorContainer.textContent();
    }
}