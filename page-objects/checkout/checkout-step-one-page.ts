import { type Locator, type Page } from '@playwright/test';
import { ErrorComponent } from 'components/error-component';
import { CHECKOUT_STEP_ONE_URL } from 'constants/routes';

export class CheckoutStepOnePage {
    readonly page: Page;
    readonly errorComponent: ErrorComponent;
    readonly pageTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorComponent = new ErrorComponent(page);
        this.pageTitle = page.getByTestId('title');
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
    }

    async goto() {
        await this.page.goto(CHECKOUT_STEP_ONE_URL);
    }

    async fillFirstNameInput(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastNameInput(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillPostalCodeInput(postalCode: string) {
        await this.postalCodeInput.fill(postalCode);
    }

    async conitnue() {
        await this.continueButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstNameInput(firstName);
        await this.fillLastNameInput(lastName);
        await this.fillPostalCodeInput(postalCode);
    }
}