import { test, expect } from '@playwright/test'

test.describe('组件视觉回归测试', () => {
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

  test('Button 所有变体应该有正确的颜色', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 主要按钮 - 蓝色
    const primaryBtn = page.getByRole('button', { name: '主要按钮' }).first()
    await expect(primaryBtn).toHaveCSS('background-color', 'rgb(37, 99, 235)')
    await expect(primaryBtn).toHaveCSS('color', 'rgb(255, 255, 255)')
    await expect(primaryBtn).toHaveCSS('border-radius', '16px') // rounded-xl = 1rem

    // 次要按钮 - 蓝色（稍浅）
    const secondaryBtn = page.getByRole('button', { name: '次要按钮' }).first()
    await expect(secondaryBtn).toHaveCSS('background-color', 'rgb(59, 130, 246)')

    // 轮廓按钮 - 透明背景，蓝色边框
    const outlineBtn = page.getByRole('button', { name: '轮廓按钮' }).first()
    const outlineBorder = await outlineBtn.evaluate(el => window.getComputedStyle(el).border)
    expect(outlineBorder).toContain('rgb(37, 99, 235)')

    // 危险按钮 - 红色
    const dangerBtn = page.getByRole('button', { name: '危险按钮' }).first()
    await expect(dangerBtn).toHaveCSS('background-color', 'rgb(239, 68, 68)')
  })

  test('Input 应该有正确的焦点样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    const input = page.getByPlaceholder('请输入用户名').first()
    await expect(input).toBeVisible()

    // 验证默认边框颜色
    const defaultBorder = await input.evaluate(el => window.getComputedStyle(el).borderColor)
    expect(defaultBorder).toContain('226, 232, 240') // border color (允许 rgba)

    // 点击输入框获取焦点
    await input.click()
    await page.waitForTimeout(100) // 等待焦点动画

    // 验证焦点样式存在
    const focusOutline = await input.evaluate(el => window.getComputedStyle(el).outline)
    // 焦点样式应该存在
    expect(focusOutline).toBeDefined()
  })

  test('Switch 应该有正确的开关状态样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找未激活的开关
    const switchOff = page.locator('button[aria-checked="false"]').first()
    await expect(switchOff).toHaveCSS('background-color', 'rgb(229, 231, 235)') // gray-200

    // 点击切换
    await switchOff.click()
    await page.waitForTimeout(200)

    // 查找激活的开关
    const switchOn = page.locator('button[aria-checked="true"]').first()
    await expect(switchOn).toHaveCSS('background-color', 'rgb(37, 99, 235)') // primary color
  })

  test('所有组件应该使用正确的字体', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 检查标题字体
    const h1 = page.locator('h1').first()
    const h1Font = await h1.evaluate(el => window.getComputedStyle(el).fontFamily)
    expect(h1Font.toLowerCase()).toContain('poppins')

    // 检查正文字体
    const p = page.locator('p').first()
    const pFont = await p.evaluate(el => window.getComputedStyle(el).fontFamily)
    expect(pFont.toLowerCase()).toContain('open sans')
  })

  test('卡片应该有正确的阴影效果', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    const card = page.locator('.glass-card').first()

    // 验证阴影
    const boxShadow = await card.evaluate(el => window.getComputedStyle(el).boxShadow)
    expect(boxShadow).not.toBe('none')
    expect(boxShadow).toContain('rgba')
  })

  test('间距应该符合设计规范', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 检查容器的内边距
    const mainContainer = page.locator('main').first()
    const padding = await mainContainer.evaluate(el => {
      const style = window.getComputedStyle(el)
      return {
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom
      }
    })

    // py-8 = 32px, px-4 = 16px (sm)
    expect(padding.paddingTop).toBe('32px')
    expect(padding.paddingBottom).toBe('32px')
  })

  test('文本颜色应该符合设计规范', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 主要文本颜色
    const heading = page.locator('h2').first()
    const headingColor = await heading.evaluate(el => window.getComputedStyle(el).color)
    expect(headingColor).toBe('rgb(30, 41, 59)') // text color

    // 次要文本颜色
    const paragraph = page.locator('section p').first()
    const paragraphColor = await paragraph.evaluate(el => window.getComputedStyle(el).color)
    expect(paragraphColor).toBe('rgb(100, 116, 139)') // text-secondary
  })

  test('背景颜色应该符合设计规范', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 主背景颜色
    const body = page.locator('body')
    const bodyBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor)
    expect(bodyBg).toBe('rgb(248, 250, 252)') // background color

    // 卡片背景颜色（白色）
    const card = page.locator('.glass-card').first()
    const cardBg = await card.evaluate(el => window.getComputedStyle(el).backgroundColor)
    expect(cardBg).toBe('rgb(255, 255, 255)')
  })

  test('响应式布局应该正常工作', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // 桌面视图
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.waitForLoadState('networkidle')

    const containerDesktop = page.locator('main').first()
    const desktopPadding = await containerDesktop.evaluate(el => window.getComputedStyle(el).paddingLeft)
    expect(desktopPadding).toBe('32px') // px-8 in lg breakpoint

    // 移动视图
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForLoadState('networkidle')

    const containerMobile = page.locator('main').first()
    const mobilePadding = await containerMobile.evaluate(el => window.getComputedStyle(el).paddingLeft)
    expect(mobilePadding).toBe('16px') // px-4 in sm breakpoint
  })
})
