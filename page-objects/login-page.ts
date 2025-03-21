import { type Locator, type Page } from '@playwright/test';
import { ErrorComponent } from '../components/error-component';
import { LOGIN_PAGE_URL } from 'constants/routes';

export class LoginPage {
    readonly page: Page;
    readonly loginContainer: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorComponent: ErrorComponent;

    constructor(page: Page) {
        this.page = page;
        this.loginContainer = page.getByTestId('login-container');
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorComponent = new ErrorComponent(page);
    }

    async goto() {
        await this.page.goto(LOGIN_PAGE_URL);
    }

    async fillPasswordInput(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillUsernameInput(username: string) {
        await this.usernameInput.fill(username);
    }

    async pressLoginButton() {
        await this.loginButton.click();
    }

    async doLogin(username: string, password: string) {
        await this.fillUsernameInput(username);
        await this.fillPasswordInput(password);
        await this.pressLoginButton();
    }
}