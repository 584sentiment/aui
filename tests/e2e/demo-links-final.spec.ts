import { test, expect, BrowserContext } from '@playwright/test'

test.describe('文档演示链接测试 - 修复版', () => {
  let context: BrowserContext
  let page

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext()
    page = await context.newPage()
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('demo.html 应该可以访问', async () => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    // 验证页面标题
    await expect(page).toHaveTitle(/Job-Ai.*在线演示/)

    // 验证内容 - 使用更精确的选择器
    await expect(page.locator('header h1')).toHaveText('Job-Ai Components')
    await expect(page.getByText('Button 按钮')).toBeVisible()
    await expect(page.getByText('主要按钮')).toBeVisible()
  })

  test('demo.html 的所有按钮都应该可以点击', async () => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    // 监听所有 dialog/alert
    page.on('dialog', dialog => {
      dialog.accept()
    })

    // 测试所有按钮
    const buttons = [
      '主要按钮',
      '次要按钮',
      '轮廓按钮',
      '幽灵按钮',
      '危险按钮'
    ]

    for (const buttonText of buttons) {
      const button = page.getByRole('button', { name: buttonText })
      await expect(button).toBeVisible()
      await button.click()
      // 页面可能会有 alert，这里等待一下
      await page.waitForTimeout(100)
    }
  })

  test('输入框应该可以正常使用', async () => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    // 输入框
    const input = page.getByPlaceholder('请输入用户名')
    await expect(input).toBeVisible()

    await input.fill('测试用户')
    await page.waitForTimeout(500)

    // 验证实时显示
    const display = page.getByText(/用户名:/)
    await expect(display).toContainText('测试用户')
  })

  test('开关应该可以切换', async () => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    // 使用 ID 选择器，因为 Switch 用的是 button[aria-checked] 而非 role="switch"
    const switchButton = page.locator('#switch1')
    await expect(switchButton).toBeVisible()

    // 获取初始状态
    const initialState = await switchButton.getAttribute('aria-checked')
    expect(initialState).toBe('false')

    // 点击切换
    await switchButton.click()
    await page.waitForTimeout(300)

    // 验证状态改变
    const newState = await switchButton.getAttribute('aria-checked')
    expect(newState).toBe('true')

    // 验证显示文字更新
    const display = page.getByText(/通知状态:/)
    await expect(display).toContainText('开启')
  })

  test('应该有使用说明', async () => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('如何在项目中使用')).toBeVisible()
    // 使用 .first() 选择第一个代码块（安装命令）
    await expect(page.locator('pre code').first()).toContainText('npm install @job-ai/components')
  })

  test('返回文档链接应该可以工作', async () => {
    await page.goto('http://localhost:5173/demo.html')
    await page.waitForLoadState('networkidle')

    // 点击返回链接
    const backLink = page.getByRole('link', { name: /返回/ })
    await backLink.click()

    // 等待导航
    await page.waitForURL('**/index.html', { timeout: 10000 })
    expect(page.url()).toContain('/index.html')
  })
})

export {}
