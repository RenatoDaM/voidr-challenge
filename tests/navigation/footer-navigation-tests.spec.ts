import { test, expect } from '@test-configuration';
import { SocialMediaTestIds } from 'components/footer';
import { ExternalLinks } from 'constants/external-links';

[
    { title: 'TC_030 should redirect to linkedin', redirectDestination : ExternalLinks.SAUCE_LABS_LINKEDIN_URL, link: SocialMediaTestIds.LINKEDIN },
    { title: 'TC_031 should redirect to facebook', redirectDestination : ExternalLinks.SAUCE_LABS_FACEBOOK_URL, link: SocialMediaTestIds.FACEBOOK },
    { title: 'TC_032 should redirect to twitter', redirectDestination : ExternalLinks.SAUCE_LABS_TWITTER_URL, link: SocialMediaTestIds.TWITTER },
].forEach(({ title, redirectDestination, link }) => {
    test(title, async ({ page, productsPage }) => {
        const popupPromise = page.waitForEvent('popup');
        await productsPage.footer.navigateTo(link);
        const popup = await popupPromise;
        await expect(popup).toHaveURL(redirectDestination);
    });
})