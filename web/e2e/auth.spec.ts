import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display role selection page', async ({ page }) => {
    await page.goto('/auth/select-role');
    await expect(page.locator('h1')).toContainText(/accéder|sign in/i, { timeout: 10000 });
    const roleCards = page.locator('a[href*="/auth/"]');
    await expect(roleCards).toHaveCount(4, { timeout: 10000 });
  });

  test('should navigate to admin login from role selection', async ({ page }) => {
    await page.goto('/auth/select-role');
    await page.click('a[href="/auth/admin/login"]');
    await page.waitForURL(/\/auth\/admin\/login/);
    await expect(page.locator('input[type="email"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('input[type="password"]')).toBeVisible({ timeout: 10000 });
  });

  test('should show validation on empty login submit', async ({ page }) => {
    await page.goto('/auth/admin/login');
    const submitBtn = page.getByRole('button', { name: /connexion|sign in|se connecter/i });
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await expect(page.locator('input[type="email"]:invalid, [class*="error"], [role="alert"]')).toBeVisible();
    }
  });

  test('should show teacher login page', async ({ page }) => {
    await page.goto('/auth/teacher/login');
    await expect(page.locator('input[type="text"]')).toBeVisible({ timeout: 10000 });
  });

  test('should show parent login page', async ({ page }) => {
    await page.goto('/auth/parent/login');
    await expect(page.locator('input[type="text"]')).toBeVisible({ timeout: 10000 });
  });
});
