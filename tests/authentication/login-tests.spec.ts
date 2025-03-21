import { test, expect } from '@test-configuration';
import loginData from '@resources/data/login-data.json';


test('TC_001 should succed login with standard user', async ({ loginPage }) => {
    await loginPage.fillUsernameInput(loginData.standardUser.username);
    await loginPage.fillPasswordInput(loginData.standardUser.password);
    await expect(loginPage.errorComponent.errorContainer).not.toBeVisible();
    await loginPage.pressLoginButton();
    await expect(loginPage.errorComponent.errorContainer).not.toBeVisible();
});

test('TC_002 should fail login with non existent user', async ({ loginPage }) => {
    await loginPage.fillUsernameInput(loginData.nonExistentUser.username);
    await loginPage.fillPasswordInput(loginData.nonExistentUser.password);
    await expect(loginPage.errorComponent.errorContainer).not.toBeVisible();
    await loginPage.pressLoginButton();
    await expect(loginPage.errorComponent.errorContainer).toBeVisible();
});

test('TC_003 should fail login with empty password', async ({ loginPage }) => {
    await loginPage.fillUsernameInput(loginData.standardUser.username);
    await loginPage.pressLoginButton();
    await expect(loginPage.errorComponent.errorContainer).toBeVisible();
});

test('TC_004 should fail login with locked out user ', async ({ loginPage }) => {
    await loginPage.fillUsernameInput(loginData.lockedOutUser.username);
    await loginPage.fillPasswordInput(loginData.lockedOutUser.password);
    await loginPage.pressLoginButton();
    await expect(loginPage.errorComponent.errorContainer).toBeVisible();
});
