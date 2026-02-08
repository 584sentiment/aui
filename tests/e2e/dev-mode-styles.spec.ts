import { test, expect } from '@playwright/test'

test.describe('开发模式样式验证', () => {
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

  test('开发模式应该加载正确的样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 验证页面标题
    await expect(page).toHaveTitle(/Job-Ai Components.*开发模式/)

    // 验证主容器有 Tailwind 类
    const mainContainer = page.locator('.min-h-screen.bg-background')
    await expect(mainContainer).toBeVisible()

    // 验证 header 有正确的样式
    const header = page.locator('header.bg-surface')
    await expect(header).toHaveCSS('border-bottom-width', '1px')
  })

  test('Button 组件应该有正确的样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找主要按钮
    const primaryButton = page.getByRole('button', { name: '主要按钮' }).first()
    await expect(primaryButton).toBeVisible()

    // 验证按钮有 Tailwind 样式类
    const buttonClasses = await primaryButton.getAttribute('class')
    expect(buttonClasses).toContain('px-4')
    expect(buttonClasses).toContain('py-2.5')
    expect(buttonClasses).toContain('rounded-xl')

    // 验证按钮背景色（主要按钮应该是蓝色）
    const backgroundColor = await primaryButton.evaluate(el => window.getComputedStyle(el).backgroundColor)
    expect(backgroundColor).toBe('rgb(37, 99, 235)') // #2563EB
  })

  test('Input 组件应该有正确的样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找输入框
    const input = page.getByPlaceholder('请输入用户名').first()
    await expect(input).toBeVisible()

    // 验证输入框有正确的边框样式
    const borderWidth = await input.evaluate(el => window.getComputedStyle(el).borderWidth)
    const borderRadius = await input.evaluate(el => window.getComputedStyle(el).borderRadius)
    const padding = await input.evaluate(el => window.getComputedStyle(el).padding)

    expect(borderWidth).toBe('1px')
    expect(borderRadius).toBe('12px') // 0.75rem = 12px
    expect(padding).toBe('10px 16px') // py-2.5 px-4
  })

  test('Switch 组件应该有正确的样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找 Switch 按钮
    const switchButton = page.locator('button[aria-checked="false"]').first()
    await expect(switchButton).toBeVisible()

    // 验证 Switch 的圆角和尺寸
    const borderRadius = await switchButton.evaluate(el => window.getComputedStyle(el).borderRadius)
    expect(borderRadius).toBe('9999px') // 完全圆角
  })

  test('玻璃态卡片应该有正确的样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找玻璃态卡片
    const glassCard = page.locator('.glass-card').first()
    await expect(glassCard).toBeVisible()

    // 验证卡片有背景色和圆角
    const backgroundColor = await glassCard.evaluate(el => window.getComputedStyle(el).backgroundColor)
    const borderRadius = await glassCard.evaluate(el => window.getComputedStyle(el).borderRadius)

    expect(backgroundColor).toBe('rgb(255, 255, 255)') // 白色背景
    expect(borderRadius).toBe('16px') // 1rem = 16px
  })

  test('文本颜色应该符合设计规范', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 验证主标题颜色
    const h1 = page.locator('h1').first()
    const h1Color = await h1.evaluate(el => window.getComputedStyle(el).color)
    expect(h1Color).toBe('rgb(37, 99, 235)') // primary color

    // 验证正文文本颜色
    const p = page.locator('section p').first()
    const pColor = await p.evaluate(el => window.getComputedStyle(el).color)
    expect(pColor).toBe('rgb(100, 116, 139)') // text-secondary
  })

  test('Tailwind CSS 应该正确加载', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 检查 Tailwind 的基础样式是否应用
    const body = page.locator('body')
    const bodyFont = await body.evaluate(el => window.getComputedStyle(el).fontFamily)

    // 应该使用 Open Sans 字体
    expect(bodyFont.toLowerCase()).toContain('open sans')

    // 检查页面是否有 Tailwind 的 utility 类效果
    const container = page.locator('.max-w-7xl').first()
    await expect(container).toBeVisible()

    // 验证 max-width 样式
    const maxWidth = await container.evaluate(el => window.getComputedStyle(el).maxWidth)
    expect(maxWidth).toBe('1280px') // 7xl = 80rem = 1280px
  })
})
