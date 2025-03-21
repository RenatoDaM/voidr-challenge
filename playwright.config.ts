import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    testIdAttribute: 'data-test'
  },

  projects: [
    { 
      name: 'setup', 
      testMatch: /setup\/.*\.setup\.ts/
    },

    {
      name: 'standard-user',
      use: { 
        storageState: 'playwright/.auth/standard_user.json'
      },
      dependencies: ['setup']
      
    },

    {
      name: 'problem-user',
      use: { 
        storageState: 'playwright/.auth/problem_user.json'
      },
      dependencies: ['setup']
    }
  ],
});
