import { defineConfig, devices } from '@playwright/test';

// Repo-wide E2E boilerplate. Everything under e2e/ shares this one config and
// browser install rather than each app/package carrying its own Playwright setup.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Starts everything a spec might need; a given spec only talks to the
  // server(s) its own tests target. Extend this array as more apps get specs.
  webServer: [
    {
      command: 'npm run dev:components',
      url: 'http://localhost:6006',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    {
      command: 'npm run dev:pilot:backend',
      url: 'http://localhost:5100/api/health',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    {
      command: 'npm run dev:pilot:frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
