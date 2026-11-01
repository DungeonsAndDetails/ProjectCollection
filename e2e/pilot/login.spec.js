import { expect, test } from '@playwright/test';

// Boilerplate example: the same manual check that verified the login page
// after it was first built, now repeatable. Google's own script rejects the
// placeholder client id in apps/Pilot/{backend,frontend}/.env, so this only
// asserts the page itself renders correctly — not a completed sign-in.
test('Pilot login page renders the Google sign-in card', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await expect(page.getByText('Continue with Google')).toBeVisible();
});
