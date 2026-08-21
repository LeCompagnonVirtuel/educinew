import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display hero section with CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
    const cta = page.getByRole('link', { name: /commencer|essai/i }).first();
    await expect(cta).toBeVisible();
  });

  test('should navigate to blog page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1')).toContainText('Blog');
  });

  test('should have footer with Harouna Dev signature', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toContainText('Harouna Dev');
  });
});
