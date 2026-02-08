import { test, expect } from '@playwright/test'

test.describe('视觉和响应式测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('页面应该有正确的标题', async ({ page }) => {
    await expect(page).toHaveTitle(/Job-Ai Components/)
  })

  test('应该显示顶部导航', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(page.getByText('Job-Ai Components')).toBeVisible()
  })

  test('应该显示所有主要区域', async ({ page }) => {
    await expect(page.getByText('组件库开发模式')).toBeVisible()
    await expect(page.getByText('Button 按钮')).toBeVisible()
    await expect(page.getByText('Form 表单组件')).toBeVisible()
    await expect(page.getByText('Feedback 反馈组件')).toBeVisible()
    await expect(page.getByText('Navigation 导航组件')).toBeVisible()
  })

  test('状态标签应该有不同的颜色', async ({ page }) => {
    await page.getByText('状态展示').scrollIntoViewIfNeeded()

    const successBadge = page.locator('span').filter({ hasText: '成功' }).first()
    const infoBadge = page.locator('span').filter({ hasText: '信息' }).first()
    const warningBadge = page.locator('span').filter({ hasText: '警告' }).first()
    const dangerBadge = page.locator('span').filter({ hasText: '危险' }).first()

    await expect(successBadge).toBeVisible()
    await expect(infoBadge).toBeVisible()
    await expect(warningBadge).toBeVisible()
    await expect(dangerBadge).toBeVisible()

    // 验证颜色类名
    await expect(successBadge).toHaveClass(/bg-success/)
    await expect(infoBadge).toHaveClass(/bg-primary/)
    await expect(warningBadge).toHaveClass(/bg-warning/)
    await expect(dangerBadge).toHaveClass(/bg-danger/)
  })

  test('移动端响应式布局', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 })

    // 验证导航栏可见
    await expect(page.locator('header')).toBeVisible()

    // 验证组件可以正常交互
    await page.getByText('Button 按钮').scrollIntoViewIfNeeded()
    await expect(page.getByRole('button', { name: '主要按钮' }).first()).toBeVisible()
  })

  test('平板端响应式布局', async ({ page }) => {
    // 设置平板视口
    await page.setViewportSize({ width: 768, height: 1024 })

    await expect(page.locator('header')).toBeVisible()

    // 滚动到表单区域
    await page.getByText('Form 表单组件').scrollIntoViewIfNeeded()
    await expect(page.getByLabel('用户名')).toBeVisible()
  })

  test('应该有页脚', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(page.getByText(/Job-Ai Components 开发模式/)).toBeVisible()
  })

  test('所有卡片应该有统一的样式', async ({ page }) => {
    await page.getByText('Button 按钮').scrollIntoViewIfNeeded()

    // 查找所有卡片
    const cards = page.locator('.glass-card')

    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    // 验证第一个卡片有正确的样式
    const firstCard = cards.first()
    await expect(firstCard).toHaveClass(/bg-surface/)
    await expect(firstCard).toHaveClass(/rounded-xl/)
    await expect(firstCard).toHaveClass(/shadow-soft/)
  })
})
