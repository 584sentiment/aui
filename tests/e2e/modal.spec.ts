import { test, expect } from '@playwright/test'

test.describe('Modal 对话框测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('button', { timeout: 5000 })
  })

  test('应该能够打开对话框', async ({ page }) => {
    await page.getByText('Feedback 反馈组件').scrollIntoViewIfNeeded()

    // 点击打开对话框按钮
    const openButton = page.getByRole('button', { name: '打开对话框' })
    await openButton.click()

    // 等待对话框出现
    const dialog = page.locator('[role="dialog"]').or(page.locator('.fixed.inset-0'))
    await expect(dialog).toBeVisible()

    // 验证对话框标题
    await expect(page.getByText('对话框标题')).toBeVisible()
  })

  test('对话框应该显示标题和内容', async ({ page }) => {
    await page.getByText('打开对话框').click()

    // 等待对话框出现
    await page.waitForSelector('[role="dialog"]', { state: 'visible' })

    // 验证标题
    await expect(page.getByText('对话框标题')).toBeVisible()

    // 验证内容
    await expect(page.getByText(/这是对话框的内容/)).toBeVisible()

    // 验证按钮
    await expect(page.getByRole('button', { name: '取消' })).toBeVisible()
    await expect(page.getByRole('button', { name: '确认' })).toBeVisible()
  })

  test('应该能够关闭对话框', async ({ page }) => {
    await page.getByText('打开对话框').click()

    // 等待对话框出现
    await page.waitForSelector('[role="dialog"]', { state: 'visible' })

    // 点击取消按钮
    await page.getByRole('button', { name: '取消' }).click()

    // 等待对话框消失
    await page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 5000 })

    // 验证对话框已关闭
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).not.toBeVisible()
  })

  test('点击背景应该关闭对话框', async ({ page }) => {
    await page.getByText('打开对话框').click()

    // 等待对话框出现
    await page.waitForSelector('[role="dialog"]', { state: 'visible' })

    // 点击背景遮罩
    const backdrop = page.locator('.fixed.inset-0.bg-black\\/50')
    await backdrop.click({ force: true })

    // 等待对话框消失
    await page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 5000 })

    // 验证对话框已关闭
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).not.toBeVisible()
  })

  test('应该能够打开确认对话框', async ({ page }) => {
    await page.getByText('打开确认对话框').click()

    // 等待对话框出现
    await page.waitForSelector('[role="dialog"]', { state: 'visible' })

    // 验证确认对话框内容
    await expect(page.getByText('确认操作')).toBeVisible()
    await expect(page.getByText(/确定要删除这条记录吗/)).toBeVisible()
    await expect(page.getByRole('button', { name: '确认删除' })).toBeVisible()
  })

  test('对话框应该有背景遮罩', async ({ page }) => {
    await page.getByText('打开对话框').click()

    // 等待对话框出现
    await page.waitForSelector('[role="dialog"]', { state: 'visible' })

    // 检查背景遮罩
    const backdrop = page.locator('.fixed.inset-0.bg-black\\/50')
    await expect(backdrop).toBeVisible()

    // 验证遮罩有模糊效果
    const backdropBlur = await backdrop.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter
    })
    expect(backdropBlur).toContain('blur')
  })
})
