import { test, expect } from '@playwright/test'

test.describe('VitePress Demo 插件测试', () => {
  test.beforeAll(async ({ request }) => {
    let retries = 0
    while (retries < 30) {
      try {
        await request.get('http://localhost:5173', { timeout: 2000 })
        break
      } catch {
        retries++
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  })

  test('Button 组件 Demo 应该正常显示', async ({ page }) => {
    await page.goto('http://localhost:5173/components/Button.html')
    await page.waitForLoadState('networkidle')

    // 等待 demo 组件加载
    await page.waitForTimeout(2000)

    // 截图
    await page.screenshot({ path: 'test-results/button-demo.png' })

    // 验证 demo 区域存在
    const demoContainer = page.locator('.vitepress-demo-plugin').first()
    await expect(demoContainer).toBeVisible()

    // 验证按钮存在
    const buttons = page.locator('.vitepress-demo-plugin button, .demo-section button')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('Input 组件 Demo 应该正常显示', async ({ page }) => {
    await page.goto('http://localhost:5173/components/Input.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'test-results/input-demo.png' })

    // 验证输入框存在
    const inputs = page.locator('.vitepress-demo-plugin input, .demo-section input')
    const count = await inputs.count()
    expect(count).toBeGreaterThan(0)
  })

  test('Select 组件 Demo 应该正常显示', async ({ page }) => {
    await page.goto('http://localhost:5173/components/Select.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'test-results/select-demo.png' })

    // 验证 select 组件存在
    const selects = page.locator('.vitepress-demo-plugin .relative, .demo-section .relative')
    const count = await selects.count()
    expect(count).toBeGreaterThan(0)
  })

  test('DatePicker 组件 Demo 应该正常显示', async ({ page }) => {
    await page.goto('http://localhost:5173/components/DatePicker.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'test-results/datepicker-demo.png' })

    // 验证 DatePicker 组件存在
    const datePickers = page.locator('.vitepress-demo-plugin .date-picker-wrapper, .demo-section .date-picker-wrapper')
    const count = await datePickers.count()
    expect(count).toBeGreaterThan(0)
  })

  test('Modal 组件 Demo 应该正常显示', async ({ page }) => {
    await page.goto('http://localhost:5173/components/Modal.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'test-results/modal-demo.png' })

    // 验证按钮存在（用于打开 Modal）
    const buttons = page.locator('.vitepress-demo-plugin button, .demo-section button')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('Button Demo 交互功能应该正常', async ({ page }) => {
    await page.goto('http://localhost:5173/components/Button.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    // 查找 demo 区域中的按钮
    const demoButtons = page.locator('.vitepress-demo-plugin button').all()

    // 查找包含"点击计数"文本的按钮
    const countButton = page.locator('.vitepress-demo-plugin button:has-text("点击计数")').first()

    // 获取初始文本
    const initialText = await countButton.textContent()

    // 点击按钮
    await countButton.click()
    await page.waitForTimeout(500)

    // 验证点击计数增加
    const newText = await countButton.textContent()
    expect(newText).not.toBe(initialText)

    await page.screenshot({ path: 'test-results/button-demo-interaction.png' })
  })

  test('Input Demo 交互功能应该正常', async ({ page }) => {
    await page.goto('http://localhost:5173/components/Input.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    // 查找第一个输入框
    const firstInput = page.locator('.vitepress-demo-plugin input').first()

    // 输入文本
    await firstInput.fill('测试输入')
    await page.waitForTimeout(500)

    // 验证输入值
    const value = await firstInput.inputValue()
    expect(value).toBe('测试输入')

    await page.screenshot({ path: 'test-results/input-demo-interaction.png' })
  })

  test('DatePicker Demo 交互功能应该正常', async ({ page }) => {
    await page.goto('http://localhost:5173/components/DatePicker.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    // 查找 DatePicker 输入框
    const datePickerInput = page.locator('.vitepress-demo-plugin .date-picker-wrapper button').first()

    // 点击打开日历
    await datePickerInput.click()
    await page.waitForTimeout(500)

    // 验证日历弹出框显示
    const calendar = page.locator('.vitepress-demo-plugin .absolute.z-\\[130\\]').first()
    await expect(calendar).toBeVisible()

    await page.screenshot({ path: 'test-results/datepicker-demo-interaction.png' })
  })

  test('文档页面应该包含 demo 代码块', async ({ page }) => {
    await page.goto('http://localhost:5173/components/Button.html')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    // 验证页面包含 demo 组件
    const demoElements = page.locator('.vitepress-demo-plugin, [class*="demo"]')
    const count = await demoElements.count()
    expect(count).toBeGreaterThan(0)
  })

  test('文档导航应该正常工作', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.waitForLoadState('networkidle')

    // 点击导航链接
    const buttonLink = page.locator('a:has-text("Button")').first()
    await buttonLink.click()
    await page.waitForLoadState('networkidle')

    // 验证 URL
    expect(page.url()).toContain('Button')

    await page.screenshot({ path: 'test-results/docs-navigation.png' })
  })
})
