import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.TEST_ENV || 'qa';

dotenv.config({
    path: path.resolve(__dirname, `config/.env.${env}`),
});

export default defineConfig({
  testDir: './tests',

  fullyParallel: true, // boolean - parallel 

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : undefined,

   reporter: [
        ['html'],
        ['allure-playwright']
    ],

  use: {
    baseURL: process.env.BASE_URL,
//key: value pair
    // Take screenshot only when test fails
    screenshot: 'only-on-failure', //screenshot automatically on failure, 300*3=900

    trace: 'on', //logs, zip
    //generate a trace for every test // stored 
    //test results/ <testname>/trace.zip
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/e2e/auth.json', //this will load your saved login
      },
    },
  ],
});
//20 tests
//1 test - Login - storagestate - 19 tests, 190 2 tests
//playwright.config.ts
//auth.setup.ts
//auth.json
//LoginPage.ts