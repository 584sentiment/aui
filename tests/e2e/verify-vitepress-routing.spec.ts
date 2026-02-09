import { test, expect } from '@playwright/test'

test('验证 VitePress 路由正确', async ({ page }) => {
  // 访问组件页面
  await page.goto('http://localhost:5174/components/Button')
  
  // 等待页面加载
  await page.waitForLoadState('networkidle')
  
  // 验证这不是 demo.html 页面
  const title = await page.title()
  expect(title).not.toBe('Job-Ai Components 开发模式')
  
  // 验证包含 VitePress 特征元素
  const content = await page.content()
  
  // 检查是否有 VitePress 的侧边栏或导航栏
  const hasVitePressNav = await page.locator('.VPNav').count() > 0 ||
                          await page.locator('.VPSidebar').count() > 0
  
  expect(hasVitePressNav).toBeTruthy()
  
  // 检查页面标题区域
  const h1 = await page.locator('h1').first().textContent()
  expect(h1).toContain('Button')
})

test('验证交互演示页面可访问', async ({ page }) => {
  await page.goto('http://localhost:5174/interactive-demo.html')
  
  await page.waitForLoadState('networkidle')
  
  const title = await page.title()
  expect(title).toBe('Job-Ai Components 开发模式')
  
  // 验证包含交互式演示环境的特征
  const content = await page.content()
  expect(content).toContain('组件库开发模式')
})
