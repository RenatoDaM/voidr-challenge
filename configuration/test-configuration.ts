import { test as base } from '@playwright/test';
import { ShoppingCartPage } from '@page-objects/shopping-cart';
import { ProductsEnum, ProductsPage } from '@page-objects/products-page';
import { LoginPage } from '@page-objects/login-page';
import { CheckoutStepOnePage } from '@page-objects/checkout/checkout-step-one-page';
import { CheckoutStepTwoPage } from '@page-objects/checkout/checkout-step-two-page';
import { CheckoutCompletePage } from '@page-objects/checkout/checkout-complete-page';

type MyFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  shoppingCartPage: ShoppingCartPage;
  populatedShoppingCartPage: ShoppingCartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();

    await use(productsPage);
  },

  shoppingCartPage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.goto();

    await use(shoppingCartPage);

    await shoppingCartPage.emptyCart();
  },

  populatedShoppingCartPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.inventoryItem.addToCart(ProductsEnum.Backpack);
    await productsPage.inventoryItem.addToCart(ProductsEnum.BikeLight);
    await productsPage.inventoryItem.addToCart(ProductsEnum.BoltShirt);
    await productsPage.inventoryItem.addToCart(ProductsEnum.Jacket);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.goto();

    await use(shoppingCartPage);

    await shoppingCartPage.emptyCart();
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.goto();
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },
});

export { expect } from '@playwright/test';