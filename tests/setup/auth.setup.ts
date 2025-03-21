import { test as setup, expect, Page } from '@playwright/test';
import path from 'path';
import { LoginPage } from '@page-objects/login-page';
import { ProductsPage } from '@page-objects/products-page';
import loginData from '@resources/data/login-data.json';

const AUTH_FILE_BASE_PATH = path.join(__dirname, '../../playwright/.auth/');

async function setupStorageStateWithAuthenticatedUser(page: Page, username: string, password: string, authFilePath: string) {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.doLogin(username, password);
  await expect(productsPage.header.primaryHeaderContainer).toBeVisible();
  await page.context().storageState({ path: authFilePath });
}

setup('setup storage states with authenticated users', async ({ page }) => {
  await setupStorageStateWithAuthenticatedUser(
    page,
    loginData.standardUser.username,
    loginData.standardUser.password,
    AUTH_FILE_BASE_PATH + loginData.standardUser.username + '.json'
  );

  await setupStorageStateWithAuthenticatedUser(
    page,
    loginData.problemUser.username,
    loginData.problemUser.password,
    AUTH_FILE_BASE_PATH + loginData.problemUser.username + '.json'
  );
});