import { type Page } from '@playwright/test';

export class Footer {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(socialMediaTestId: SocialMediaTestIds) {
        await this.page.getByTestId(socialMediaTestId).click();
    }
}

export enum SocialMediaTestIds {
    LINKEDIN = 'social-linkedin',
    TWITTER = 'social-twitter',
    FACEBOOK = 'social-facebook',
}