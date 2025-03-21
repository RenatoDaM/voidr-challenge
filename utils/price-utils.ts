import { Locator } from "@playwright/test";

export function extractPrice(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
}

export async function getPricesFromLocator(locator: Locator): Promise<number[]> {
    const pricesText = await locator.allTextContents();
    return pricesText.map(extractPrice);
}