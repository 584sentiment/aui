import { test, expect } from '@playwright/test'

test.describe('Navigation 导航组件测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('button', { timeout: 5000 })
  })

  test('Tabs 组件应该正常工作', async ({ page }) => {
    await page.getByText('Navigation 导航组件').scrollIntoViewIfNeeded()

    // 验证所有标签页按钮存在
    await expect(page.getByRole('tab', { name: '标签页 1' })).toBeVisible()
    await expect(page.getByRole('tab', { name: '标签页 2' })).toBeVisible()
    await expect(page.getByRole('tab', { name: '标签页 3' })).toBeVisible()
  })

  test('应该能够切换标签页', async ({ page }) => {
    await page.getByText('Navigation 导航组件').scrollIntoViewIfNeeded()

    // 点击第二个标签页
    await page.getByRole('tab', { name: '标签页 2' }).click()

    // 验证内容显示
    await expect(page.getByText('标签页 2 内容')).toBeVisible()

    // 点击第三个标签页
    await page.getByRole('tab', { name: '标签页 3' }).click()

    // 验证内容显示
    await expect(page.getByText('标签页 3 内容')).toBeVisible()
  })

  test('Pagination 组件应该正常工作', async ({ page }) => {
    await page.getByText('Navigation 导航组件').scrollIntoViewIfNeeded()

    // 验证分页组件存在
    await expect(page.getByText('共 100 条')).toBeVisible()

    // 验证页码按钮存在
    const pageButtons = page.locator('button').filter({ hasText: /^\d+$/ })
    await expect(pageButtons.first()).toBeVisible()
  })

  test('应该能够翻页', async ({ page }) => {
    await page.getByText('Navigation 导航组件').scrollIntoViewIfNeeded()

    // 获取当前页显示
    const currentPageBefore = page.getByText(/当前页:/)
    await expect(currentPageBefore).toContainText('1')

    // 点击下一页
    const nextButton = page.locator('button').filter({ hasText: /›/ }).or(
      page.locator('button').filter({ hasText: /→/ })
    ).first()

    if (await nextButton.isEnabled()) {
      await nextButton.click()

      // 验证页码改变
      await expect(currentPageBefore).toContainText('2', { timeout: 3000 })
    }
  })

  test('Pagination 应该显示总条数', async ({ page }) => {
    await page.getByText('Navigation 导航组件').scrollIntoViewIfNeeded()

    await expect(page.getByText('共 100 条')).toBeVisible()
  })

  test('第一页时上一页按钮应该禁用', async ({ page }) => {
    await page.getByText('Navigation 导航组件').scrollIntoViewIfNeeded()

    // 查找上一页按钮
    const prevButton = page.locator('button').filter({ hasText: /‹/ }).or(
      page.locator('button').filter({ hasText: /←/ })
    ).first()

    // 验证禁用状态
    await expect(prevButton).toBeDisabled()
  })

  test('Tabs 样式应该正确显示', async ({ page }) => {
    await page.getByText('Navigation 导航组件').scrollIntoViewIfNeeded()

    // 验证线条样式标签页
    const lineTabs = page.locator('.border-b').first()
    await expect(lineTabs).toBeVisible()

    // 验证卡片样式标签页
    const cardTabs = page.locator('.bg-gray-50').or(page.locator('.bg-background')).first()
    await expect(cardTabs).toBeVisible()
  })
})
