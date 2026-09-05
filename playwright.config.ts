import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

const e2eDatabaseUri = process.env.E2E_DATABASE_URI

// Fail-closed database isolation gate:
// Playwright webServer spawns `pnpm dev`, which initializes Payload CMS in development mode.
// In development mode, Payload executes DDL schema push (`push: true`).
// If DATABASE_URI is inherited from the parent environment (.env), it points to the production database.
// To prevent any possibility of running development push against production tables,
// Playwright execution must fail closed if E2E_DATABASE_URI is not explicitly provided.
if (!e2eDatabaseUri || !e2eDatabaseUri.trim()) {
  throw new Error(
    '[E2E Database Safety Gate] Playwright execution refused: E2E_DATABASE_URI is not set.\n' +
      'Playwright webServer cannot launch "pnpm dev" without an explicit disposable/staging database,\n' +
      'as development push would mutate whatever database the child process inherited.\n' +
      'Set E2E_DATABASE_URI to a dedicated disposable or staging PostgreSQL database.'
  )
}

// Ensure in-process config evaluations or test helpers strictly target the disposable DB
process.env.DATABASE_URI = e2eDatabaseUri

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    reuseExistingServer: false,
    url: 'http://127.0.0.1:3000',
    timeout: 120000,
    env: {
      ...process.env,
      DATABASE_URI: e2eDatabaseUri,
    },
  },
})

