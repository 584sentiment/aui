import { test, expect } from '@playwright/test'

test.describe('Button 组件测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('button', { timeout: 5000 })
  })

  test('应该渲染所有按钮样式', async ({ page }) => {
    // 滚动到按钮区域
    await page.getByText('不同样式').scrollIntoViewIfNeeded()

    // 检查各种按钮是否存在
    const primaryButton = page.getByRole('button', { name: '主要按钮' })
    const secondaryButton = page.getByRole('button', { name: '次要按钮' })
    const outlineButton = page.getByRole('button', { name: '轮廓按钮' })
    const ghostButton = page.getByRole('button', { name: '幽灵按钮' })
    const dangerButton = page.getByRole('button', { name: '危险按钮' })

    await expect(primaryButton).toBeVisible()
    await expect(secondaryButton).toBeVisible()
    await expect(outlineButton).toBeVisible()
    await expect(ghostButton).toBeVisible()
    await expect(dangerButton).toBeVisible()
  })

  test('应该渲染不同尺寸的按钮', async ({ page }) => {
    await page.getByText('不同尺寸').scrollIntoViewIfNeeded()

    const smallButton = page.getByRole('button', { name: '小按钮' })
    const mediumButton = page.getByRole('button', { name: '中按钮' })
    const largeButton = page.getByRole('button', { name: '大按钮' })

    await expect(smallButton).toBeVisible()
    await expect(mediumButton).toBeVisible()
    await expect(largeButton).toBeVisible()

    // 检查不同尺寸的按钮有不同的高度
    const smallBox = await smallButton.boundingBox()
    const mediumBox = await mediumButton.boundingBox()
    const largeBox = await largeButton.boundingBox()

    expect(smallBox!.height).toBeLessThan(mediumBox!.height)
    expect(mediumBox!.height).toBeLessThan(largeBox!.height)
  })

  test('应该正确显示禁用状态', async ({ page }) => {
    await page.getByText('不同状态').scrollIntoViewIfNeeded()

    const disabledButton = page.getByRole('button', { name: '禁用按钮' })

    await expect(disabledButton).toBeDisabled()
  })

  test('应该显示加载状态', async ({ page }) => {
    await page.getByText('不同状态').scrollIntoViewIfNeeded()

    const loadingButton = page.getByRole('button', { name: '加载中...' })

    await expect(loadingButton).toBeVisible()

    // 检查是否有旋转图标
    const spinner = loadingButton.locator('.animate-spin')
    await expect(spinner).toBeVisible()
  })

  test('块级按钮应该占满容器宽度', async ({ page }) => {
    await page.getByText('块级按钮').scrollIntoViewIfNeeded()

    const blockButton = page.getByRole('button', { name: '块级按钮' })
    const container = blockButton.locator('..')

    await expect(blockButton).toBeVisible()

    // 检查块级按钮是否占满容器
    const buttonBox = await blockButton.boundingBox()
    const containerBox = await container.boundingBox()

    expect(buttonBox!.width).toBeCloseTo(containerBox!.width, 100)
  })

  test('按钮应该有悬停效果', async ({ page }) => {
    await page.getByText('不同样式').scrollIntoViewIfNeeded()

    const primaryButton = page.getByRole('button', { name: '主要按钮' })

    // 获取悬停前的样式
    const beforeHover = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // 悬停
    await primaryButton.hover()

    // 获取悬停后的样式
    const afterHover = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // 悬停后颜色应该改变
    expect(beforeHover).not.toBe(afterHover)
  })

  test('按钮应该可以点击', async ({ page }) => {
    await page.getByText('不同样式').scrollIntoViewIfNeeded()

    const primaryButton = page.getByRole('button', { name: '主要按钮' })

    // 监听控制台消息
    const consoleMessages: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await primaryButton.click()

    // 检查是否有点击日志
    expect(consoleMessages.some(msg => msg.includes('Button clicked'))).toBe(true)
  })
})
