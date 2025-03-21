import { test, expect } from '@test-configuration';
import checkoutData from '@resources/data/checkout-data.json'
import { ANY_TEXT_REGEX, MONETARY_VALUE_REGEX } from 'utils/regex-utils';
import { getPricesFromLocator } from 'utils/price-utils';
import { InventoryItem } from 'components/products/inventory-item';
import { CheckoutStepTwoPage } from '@page-objects/checkout/checkout-step-two-page';
import texts from '@resources/page-texts/en.json'

const validUsers = checkoutData.validUsers;
const invalidUsers = checkoutData.invalidUsers;

test('TC_017 should complete the checkout process', async ({ populatedShoppingCartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    await populatedShoppingCartPage.checkout();

    const { firstName, lastName, postalCode } = validUsers.standardUser;
    await checkoutStepOnePage.fillCheckoutForm(firstName, lastName, postalCode);
    await checkoutStepOnePage.conitnue();

    await validateItemsFields(checkoutStepTwoPage.inventoryItem);
    await validateDisplayedPrices(checkoutStepTwoPage);

    await checkoutStepTwoPage.finish();
    await expect(checkoutCompletePage.successImage).toBeVisible();
    await expect(checkoutCompletePage.completeHeader).toHaveText(texts.checkoutCompletePage.completeHeader);
});

test('TC_018 should fail checkout with no products', async ({ shoppingCartPage, checkoutStepOnePage }) => {
    await shoppingCartPage.checkout();
    await expect(checkoutStepOnePage.continueButton).not.toBeVisible();
});

[
    { title: 'TC_019 should fail checkout with invalid zipcode', user: invalidUsers.invalidPostalCodeUser },
    { title: 'TC_020 should fail checkout without first name', user: invalidUsers.userWithoutFirstName },
    { title: 'TC_021 should fail checkout without zipcode', user: invalidUsers.userWithoutPostalCode },
    { title: 'TC_022 should fail checkout with blank values', user: invalidUsers.blankUser }
].forEach(({ title, user }) => {
    test(title, async ({ populatedShoppingCartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
        await populatedShoppingCartPage.checkout();

        const { firstName, lastName, postalCode } = user;
        await checkoutStepOnePage.fillCheckoutForm(firstName, lastName, postalCode);
        await checkoutStepOnePage.conitnue();
        await expect.soft(checkoutStepOnePage.errorComponent.errorContainer).toBeVisible();
        await expect(checkoutStepTwoPage.finishButton).not.toBeVisible();
    });
});

test('TC_023 should cancel the checkout at first step and keep products in cart', async ({ populatedShoppingCartPage, checkoutStepOnePage }) => {
    await populatedShoppingCartPage.checkout();
    await checkoutStepOnePage.cancel();
    await expect(populatedShoppingCartPage.cartList).toBeVisible();
    await validateItemsFields(populatedShoppingCartPage.inventoryItem);
});

test('TC_024 should cancel checkout at second step and keep products in cart', async ({ populatedShoppingCartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
    await populatedShoppingCartPage.checkout();
    const { firstName, lastName, postalCode } = validUsers.standardUser;
    await checkoutStepOnePage.fillCheckoutForm(firstName, lastName, postalCode);
    await checkoutStepOnePage.conitnue();
    await checkoutStepTwoPage.cancel();
    await populatedShoppingCartPage.goto();
    await expect(populatedShoppingCartPage.cartList).toBeVisible();
    await validateItemsFields(populatedShoppingCartPage.inventoryItem);
});

test('TC_025 should fail skip checkout steps by accessing directly via URL', async ({ checkoutStepTwoPage, checkoutCompletePage }) => {
    await checkoutStepTwoPage.goto();
    await checkoutStepTwoPage.finish();
    await expect(checkoutCompletePage.successImage).not.toBeVisible();
});

async function validateItemsFields(inventoryItem: InventoryItem) {
    const inventoryItemCount = (await inventoryItem.root.all()).length;

    for (let i = 0; i < inventoryItemCount; i++) {
        await expect(inventoryItem.name.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.description.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.price.nth(i)).toHaveText(ANY_TEXT_REGEX);
        await expect(inventoryItem.quantity.nth(i)).toHaveText("1");
    }
}

async function validateDisplayedPrices(checkoutStepTwoPage: CheckoutStepTwoPage) {
    const prices = await getPricesFromLocator(checkoutStepTwoPage.inventoryItem.price);
    const calculatedSubTotal = prices.reduce((acc, price) => acc + price, 0);
    const calculatedTotal = calculatedSubTotal + parseFloat(await checkoutStepTwoPage.getTax());

    const displayedSubTotal = await checkoutStepTwoPage.getSubtotal();
    const displayedTotal = await checkoutStepTwoPage.getTotal();

    expect.soft(parseFloat(displayedSubTotal)).toBeCloseTo(calculatedSubTotal, 2);
    expect.soft(displayedSubTotal).toMatch(MONETARY_VALUE_REGEX);
    expect.soft(parseFloat(displayedTotal)).toBeCloseTo(calculatedTotal, 2);
    expect.soft(displayedTotal).toMatch(MONETARY_VALUE_REGEX);
}