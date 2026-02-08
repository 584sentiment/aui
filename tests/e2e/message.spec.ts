import { test, expect } from '@playwright/test'

test.describe('Message 组件测试', () => {
  test.beforeAll(async ({ request }) => {
    // 等待开发服务器启动
    let retries = 0
    while (retries < 30) {
      try {
        await request.get('http://localhost:3002', { timeout: 2000 })
        break
      } catch {
        retries++
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  })

  test('应该显示 Message 消息', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 查找 Message 触发按钮
    const showSuccessButton = page.getByRole('button', { name: /显示成功.*Message/i }).first()
    await expect(showSuccessButton).toBeVisible()
    await showSuccessButton.click()

    // 等待 Message 出现
    await page.waitForTimeout(300)

    // 验证 Message 可见
    const message = page.locator('[role="alert"]').first()
    await expect(message).toBeVisible()

    // 验证 Message 内容
    await expect(message).toContainText('操作成功')
  })

  test('Message 应该有正确的类型样式', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 测试成功类型
    const showSuccessButton = page.getByRole('button', { name: /显示成功.*Message/i })
    await showSuccessButton.click()
    await page.waitForTimeout(300)

    const successMessage = page.locator('[role="alert"]').first()
    const successBorder = await successMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.borderColor
    })
    expect(successBorder).toBe('rgb(16, 185, 129)') // success color

    // 等待 Message 消失
    await page.waitForTimeout(3500)
    await expect(successMessage).not.toBeVisible()

    // 测试错误类型
    const showErrorButton = page.getByRole('button', { name: /显示错误.*Message/i })
    await showErrorButton.click()
    await page.waitForTimeout(300)

    const errorMessage = page.locator('[role="alert"]').first()
    const errorBorder = await errorMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.borderColor
    })
    expect(errorBorder).toBe('rgb(239, 68, 68)') // danger color
  })

  test('Message 应该可以手动关闭', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 显示不自动关闭的 Message
    const showButton = page.getByRole('button', { name: /显示.*Message.*手动关闭/i })
    await showButton.click()
    await page.waitForTimeout(300)

    const message = page.locator('[role="alert"]').first()
    await expect(message).toBeVisible()

    // 点击关闭按钮
    const closeButton = message.locator('button[aria-label="关闭"]')
    await closeButton.click()
    await page.waitForTimeout(300)

    // 验证 Message 消失
    await expect(message).not.toBeVisible()
  })

  test('Message 应该有进入和退出动画', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    const showButton = page.getByRole('button', { name: /显示.*Message/i }).first()
    await showButton.click()

    const message = page.locator('[role="alert"]').first()

    // 检查初始位置
    await page.waitForTimeout(100)
    const initialTransform = await message.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.transform
    })

    // 动画完成后
    await page.waitForTimeout(300)
    const finalTransform = await message.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.transform
    })

    // 验证动画发生了
    expect(initialTransform).not.toBe(finalTransform)
  })

  test('Message 应该居中显示', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 显示居中的 Message
    const showButton = page.getByRole('button', { name: /显示.*Message.*居中/i })
    await showButton.click()
    await page.waitForTimeout(300)

    const message = page.locator('[role="alert"]').first()
    await expect(message).toBeVisible()

    // 检查是否居中
    const messageBox = await message.boundingBox()
    const containerBox = await page.locator('body').boundingBox()

    if (messageBox && containerBox) {
      const centerX = containerBox.x + containerBox.width / 2
      const messageCenterX = messageBox.x + messageBox.width / 2

      // 验证水平居中（误差在 10px 以内）
      expect(Math.abs(centerX - messageCenterX)).toBeLessThanOrEqual(10)
    }
  })

  test('Message 应该自动关闭', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 显示一个 2 秒后自动关闭的 Message
    const showButton = page.getByRole('button', { name: /显示.*Message.*2秒/i })
    await showButton.click()
    await page.waitForTimeout(300)

    const message = page.locator('[role="alert"]').first()
    await expect(message).toBeVisible()

    // 等待自动关闭
    await page.waitForTimeout(2500)
    await expect(message).not.toBeVisible()
  })

  test('Message 应该显示图标', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    const showButton = page.getByRole('button', { name: /显示.*Message/i })
    await showButton.first().click()
    await page.waitForTimeout(300)

    const message = page.locator('[role="alert"]').first()
    const icon = message.locator('svg').first()

    // 验证图标存在
    await expect(icon).toBeVisible()
  })

  test('多个 Message 应该堆叠显示', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 显示多个 Message
    const showMultipleButton = page.getByRole('button', { name: /显示多个.*Message/i })
    await showMultipleButton.click()

    // 等待所有 Message 都出现
    await page.waitForTimeout(1500)

    // 验证至少有 3 个 Message
    const messages = page.locator('[role="alert"]')
    const count = await messages.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('Message 应该有无障碍支持', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    const showButton = page.getByRole('button', { name: /显示成功.*Message/i })
    await showButton.click()

    const message = page.locator('[role="alert"]').first()

    // 验证 role 属性
    await expect(message).toHaveAttribute('role', 'alert')

    // 验证 aria-live 属性
    await expect(message).toHaveAttribute('aria-live', 'polite')
  })

  test('Message 应该支持标题', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    const showButton = page.getByRole('button', { name: /显示.*Message.*标题/i })
    await showButton.click()
    await page.waitForTimeout(300)

    const message = page.locator('[role="alert"]').first()

    // 验证标题存在
    const title = message.locator('p.font-semibold')
    await expect(title).toBeVisible()
    await expect(title).toContainText('操作成功')
  })
})
