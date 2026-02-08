import { test, expect } from '@playwright/test'

test.describe('Timeline 时间轴测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('button', { timeout: 5000 })
  })

  test('应该显示时间轴', async ({ page }) => {
    await page.getByText('Timeline 时间轴').scrollIntoViewIfNeeded()

    // 验证时间轴容器存在
    const timeline = page.locator('.space-y-4').filter({ hasText: '项目启动' })
    await expect(timeline).toBeVisible()
  })

  test('应该显示所有时间轴项目', async ({ page }) => {
    await page.getByText('Timeline 时间轴').scrollIntoViewIfNeeded()

    // 验证所有项目存在
    await expect(page.getByText('项目启动')).toBeVisible()
    await expect(page.getByText('设计系统')).toBeVisible()
    await expect(page.getByText('组件开发')).toBeVisible()
    await expect(page.getByText('测试验证')).toBeVisible()
  })

  test('应该显示时间戳', async ({ page }) => {
    await page.getByText('Timeline 时间轴').scrollIntoViewIfNeeded()

    await expect(page.getByText('2026-02-08 10:00')).toBeVisible()
    await expect(page.getByText('2026-02-08 12:00')).toBeVisible()
  })

  test('应该显示描述文本', async ({ page }) => {
    await page.getByText('Timeline 时间轴').scrollIntoViewIfNeeded()

    await expect(page.getByText('Job-Ai 组件库项目正式启动')).toBeVisible()
    await expect(page.getByText('完成设计令牌和主题配置')).toBeVisible()
  })

  test('时间轴项目应该有正确的顺序', async ({ page }) => {
    await page.getByText('Timeline 时间轴').scrollIntoViewIfNeeded()

    // 获取所有时间轴项目
    const items = page.locator('.relative.flex.gap-4')

    const count = await items.count()
    expect(count).toBe(4)

    // 验证顺序
    await expect(items.nth(0)).toContainText('项目启动')
    await expect(items.nth(1)).toContainText('设计系统')
    await expect(items.nth(2)).toContainText('组件开发')
    await expect(items.nth(3)).toContainText('测试验证')
  })
})
