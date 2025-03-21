import { type Locator, type Page } from '@playwright/test';
import texts from '@resources/page-texts/en.json'

export class Header {
    readonly page: Page;
    readonly primaryHeaderContainer: Locator;
    readonly shoppingCartBadge: Locator
    readonly openSidebarMenuButton: Locator;
    readonly closeSidebarMenuButton: Locator;
    readonly inventorySidebarLink: Locator;
    readonly aboutSidebarLink: Locator;
    readonly logoutSidebarLink: Locator;
    readonly resetSidebarLink: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeaderContainer = page.getByTestId('primary-header');
        this.openSidebarMenuButton = page.getByRole('button', { name: texts.header.openSidebarMenuButton });
        this.closeSidebarMenuButton = page.getByRole('button', { name: texts.header.closeSidebarMenuButton });
        this.inventorySidebarLink = page.getByTestId('inventory-sidebar-link');
        this.aboutSidebarLink = page.getByTestId('about-sidebar-link');
        this.logoutSidebarLink = page.getByTestId('logout-sidebar-link');
        this.resetSidebarLink = page.getByTestId('reset-sidebar-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    }

    async openSidebar() {
        await this.openSidebarMenuButton.click();
    }

    async closeSidebar() {
        await this.closeSidebarMenuButton.click();
    }

    async navigateToInventory() {
        await this.openSidebar();
        await this.inventorySidebarLink.click();
    }

    async navigateToAboutPage() {
        await this.openSidebar();
        await this.aboutSidebarLink.click();
    }

    async navigateToShoppingCartPage() {
        await this.shoppingCartLink.click();
    }

    async logout() {
        await this.openSidebar();
        await this.logoutSidebarLink.click();
    }

    async resetAppState() {
        await this.openSidebar();
        await this.resetSidebarLink.click();
    }

    async isSidebarOpen(): Promise<boolean> {
        return await this.closeSidebarMenuButton.isVisible();
    }
}