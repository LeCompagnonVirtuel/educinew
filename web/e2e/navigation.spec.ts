import { test, expect } from '@playwright/test';

test.describe('Navigation & Responsiveness', () => {
  test('should load landing page', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('should have meta viewport for mobile', async ({ page }) => {
    await page.goto('/');
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('role selection cards should be accessible', async ({ page }) => {
    await page.goto('/auth/select-role');
    const links = page.locator('a[href*="/auth/"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toBeVisible();
    }
  });

  test('should navigate back from blog to home', async ({ page }) => {
    await page.goto('/blog');
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });
});
