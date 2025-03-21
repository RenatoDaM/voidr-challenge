import { type Locator, type Page } from '@playwright/test';
import { InventoryItem } from 'components/products/inventory-item';
import { CHECKOUT_STEP_TWO_URL } from 'constants/routes';

export class CheckoutStepTwoPage {
    readonly page: Page;
    readonly inventoryItem: InventoryItem;
    readonly paymentInfoLabel: Locator;
    readonly paymentInfoValue: Locator;
    readonly shippingInfoLabel: Locator;
    readonly shippingInfoValue: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly cartList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItem = new InventoryItem(page);
        this.paymentInfoLabel = page.getByTestId('payment-info-label');
        this.paymentInfoValue = page.getByTestId('payment-info-value');
        this.shippingInfoLabel = page.getByTestId('shipping-info-label');
        this.shippingInfoValue = page.getByTestId('shipping-info-value');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.cancelButton = page.getByTestId('cancel');
        this.finishButton = page.getByTestId('finish');
    }

    async goto() {
        await this.page.goto(CHECKOUT_STEP_TWO_URL);
    }

    async getPaymentInfo(): Promise<string> {
        return this.paymentInfoValue.innerText();
    }

    async getShippingInfo(): Promise<string> {
        return this.shippingInfoValue.innerText();
    }

    async getSubtotal(): Promise<string> {
        const text = await this.subtotalLabel.innerText();
        return this.extractPrice(text);
    }

    async getTax(): Promise<string> {
        const text = await this.taxLabel.innerText();
        return this.extractPrice(text);
    }

    async getTotal(): Promise<string> {
        const text = await this.totalLabel.innerText();
        return this.extractPrice(text);
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async finish() {
        await this.finishButton.click();
    }

    private extractPrice(text: string): string {
        const match = text.match(/\$([\d.]+)/);
        return match ? match[1] : '0';
    }
}