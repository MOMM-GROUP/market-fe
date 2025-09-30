import { test, expect } from '@playwright/test';

// Test 1: Functional Check - Hero Section Headline
test('Verify main value proposition and CTA', async ({ page }) => {
  await page.goto('https://market.momm.group'); 

  // Check the revolutionary headline (Functional Check)
  await expect(page.getByRole('heading', { name: 'Shop Your Values. Redefine the Economy.' })).toBeVisible();

  // Check the 'Join the Movement' button (Functional Check)
  await expect(page.getByRole('button', { name: 'Join the Movement' })).toBeVisible();
});

// Test 2: Visual Check - Full Landing Page Screenshot (Snapshot Testing)
test('Verify the landing page UI is visually stable', async ({ page }) => {
  await page.goto('https://market.momm.group');
  
  // This is the Visual Regression check!
  // It takes a full-page screenshot and compares it to the baseline.
  await expect(page).toHaveScreenshot('landing-page-full.png', { fullPage: true });
});