import { test, expect } from '@playwright/test'

test.describe('组件修复验证', () => {
  test.beforeAll(async ({ request }) => {
    // 等待开发服务器启动
    let retries = 0
    while (retries < 30) {
      try {
        await request.get('http://localhost:3000', { timeout: 2000 })
        break
      } catch {
        retries++
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  })

  test('Select 下拉面板应该显示在 Switch 之上', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找 Select 组件
    const selectButton = page.locator('button[aria-haspopup="listbox"]').first()
    await expect(selectButton).toBeVisible()

    // 点击打开下拉框
    await selectButton.click()
    await page.waitForTimeout(300)

    // 验证下拉面板可见
    const dropdown = page.locator('[role="listbox"]').first()
    await expect(dropdown).toBeVisible()

    // 验证下拉面板有 z-dropdown 类
    const dropdownClasses = await dropdown.getAttribute('class') || ''
    expect(dropdownClasses).toContain('z-dropdown')

    // 验证下拉面板的定位是 fixed (使用 Teleport + Floating UI)
    const position = await dropdown.evaluate(el => window.getComputedStyle(el).position)
    expect(position).toBe('fixed')

    // 验证下拉面板在 body 下 (Teleport)
    const isInBody = await dropdown.evaluate(el => el.parentElement === document.body)
    expect(isInBody).toBe(true)
  })

  test('Tabs 切换标签时内容应该跟随变化', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找 Tabs 组件（line 样式）
    const tabsContainer = page.locator('.tabs-wrapper').first()
    await expect(tabsContainer).toBeVisible()

    // 点击第二个标签
    const secondTab = tabsContainer.locator('button').nth(1)
    await secondTab.click()
    await page.waitForTimeout(200)

    // 验证标签变为选中状态
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')

    // 验证内容区域显示正确的内容（通过检查文本）
    const contentArea = tabsContainer.locator('../div').nth(1)
    await expect(contentArea).toContainText('标签页 2')

    // 点击第三个标签
    const thirdTab = tabsContainer.locator('button').nth(2)
    await thirdTab.click()
    await page.waitForTimeout(200)

    // 验证标签变为选中状态
    await expect(thirdTab).toHaveAttribute('aria-selected', 'true')

    // 验证内容区域显示正确的内容
    await expect(contentArea).toContainText('标签页 3')
  })

  test('Tabs card 样式也应该正确工作', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找 card 样式的 Tabs
    const cardTabs = page.locator('.tabs-wrapper').filter({ hasText: '卡片样式' })
    await expect(cardTabs).toBeVisible()

    // 获取当前激活的标签
    const activeTab = cardTabs.locator('button[aria-selected="true"]')
    const initialText = await activeTab.textContent()

    // 点击另一个标签
    const inactiveTab = cardTabs.locator('button').filter({ hasText: /标签页 [12]/ }).first()
    await inactiveTab.click()
    await page.waitForTimeout(200)

    // 验证选中状态改变
    await expect(inactiveTab).toHaveAttribute('aria-selected', 'true')

    // 验证内容区域更新
    const contentArea = cardTabs.locator('../div').nth(1)
    await expect(contentArea).toContainText('当前:')
  })

  test('Select 下拉面板应该有正确的阴影、圆角和宽度', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    const selectButton = page.locator('button[aria-haspopup="listbox"]').first()
    await selectButton.click()
    await page.waitForTimeout(300)

    const dropdown = page.locator('[role="listbox"]').first()

    // 验证圆角
    const borderRadius = await dropdown.evaluate(el => window.getComputedStyle(el).borderRadius)
    expect(borderRadius).toBe('12px') // rounded-lg = 0.75rem = 12px

    // 验证阴影
    const boxShadow = await dropdown.evaluate(el => window.getComputedStyle(el).boxShadow)
    expect(boxShadow).not.toBe('none')

    // 验证宽度与按钮一致
    const buttonWidth = await selectButton.evaluate(el => el.getBoundingClientRect().width)
    const dropdownWidth = await dropdown.evaluate(el => el.getBoundingClientRect().width)

    // 允许 1px 的误差
    expect(Math.abs(buttonWidth - dropdownWidth)).toBeLessThanOrEqual(1)
  })
})
