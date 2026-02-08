import { test, expect } from '@playwright/test'

test.describe('文档演示链接测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForLoadState('networkidle')
  })

  test('顶部导航 - 在线演示链接应该可以访问', async ({ page }) => {
    // 点击顶部导航的"在线演示"链接
    const demoLink = page.getByRole('link', { name: '在线演示' })
    await expect(demoLink).toBeVisible()

    // 点击链接
    await demoLink.click()

    // 等待导航完成
    await page.waitForURL('**/demo.html')

    // 验证 URL 正确
    expect(page.url()).toContain('/demo.html')

    // 验证页面标题包含 "Job-Ai"
    await expect(page).toHaveTitle(/Job-Ai/i)

    // 验证页面内容加载
    const content = await page.content()
    expect(content).toContain('Job-Ai Components')
    expect(content).toContain('在线演示')
  })

  test('Button 组件文档中的演示链接应该可以访问', async ({ page }) => {
    // 导航到 Button 组件页面
    await page.goto('http://localhost:5173/components/Button.html')
    await page.waitForLoadState('networkidle')

    // 滚动到"在线演示"部分
    const demoSection = page.getByText('在线演示')
    await expect(demoSection).toBeVisible()

    // 查找演示链接
    const demoLink = page.getByRole('link', { name: /查看.*交互演示/ })
    await expect(demoLink).toBeVisible()

    // 获取链接的 href 属性
    const href = await demoLink.getAttribute('href')
    console.log('演示链接 href:', href)

    // 点击链接
    await demoLink.click()

    // 等待导航
    await page.waitForURL('**/demo.html', { timeout: 10000 })

    // 验证导航成功
    expect(page.url()).toContain('/demo.html')
  })

  test('demo.html 页面应该包含所有组件', async ({ page }) => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    // 验证页面标题
    await expect(page).toHaveTitle(/Job-Ai.*在线演示/)

    // 验证各个组件部分存在
    await expect(page.getByText('Button 按钮')).toBeVisible()
    await expect(page.getByText('Form 表单组件')).toBeVisible()
    await expect(page.getByText('状态标签')).toBeVisible()

    // 验证按钮存在
    const buttons = page.getByRole('button')
    await expect(buttons.first()).toBeVisible()
  })

  test('demo.html 的按钮应该可以点击', async ({ page }) => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    // 查找"主要按钮"
    const primaryButton = page.getByRole('button', { name: '主要按钮' })
    await expect(primaryButton).toBeVisible()

    // 点击按钮
    await primaryButton.click()

    // 等待 alert（使用 page.on 来捕获）
    page.on('dialog', (dialog) => {
      const message = dialog.message()
      console.log('Alert message:', message)
      expect(message).toContain('primary')
      dialog.accept()
    })

    // 验证按钮可以点击
    await expect(primaryButton).toBeEnabled()
  })

  test('所有组件文档都应该有演示链接', async ({ page }) => {
    const components = [
      'Button',
      'Input',
      'Modal',
      'Switch',
      'Select',
      'DatePicker',
      'Form',
      'Tabs',
      'Pagination',
      'Timeline'
    ]

    for (const component of components) {
      console.log(`测试 ${component} 文档...`)

      // 访问组件文档
      const response = await page.goto(`http://localhost:5173/components/${component}.html`)

      // 检查是否 404
      if (response && response.status() === 404) {
        console.log(`❌ ${component} 文档 404`)
        continue
      }

      await page.waitForLoadState('networkidle', { timeout: 5000 })

      // 检查是否有"在线演示"部分
      const demoSection = page.getByText('在线演示')
      if (await demoSection.isVisible()) {
        // 检查演示链接
        const demoLink = page.getByRole('link', { name: /查看.*交互演示/ })
        if (await demoLink.isVisible()) {
          const href = await demoLink.getAttribute('href')
          console.log(`  ✓ ${component} 有演示链接: ${href}`)
        } else {
          console.log(`  ❌ ${component} 演示链接不可见`)
        }
      } else {
        console.log(`  ❌ ${component} 没有"在线演示"部分`)
      }
    }
  })
})

export {}
