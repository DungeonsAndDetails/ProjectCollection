import { expect, test } from '@playwright/test';

// Boilerplate example: a real browser hitting a component's Storybook story
// in isolation, as opposed to shared/components' Vitest+RTL unit tests (jsdom,
// no real rendering engine). Extend with one spec per component as needed —
// this one just proves the pattern works end to end.
test('Button story renders and responds to a click', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-button--default&viewMode=story');

  const button = page.getByRole('button', { name: 'Click me' });

  await expect(button).toBeVisible();
  await button.click();
});
