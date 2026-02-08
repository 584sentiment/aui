import { test, expect } from '@playwright/test'

test.describe('Toast 组件测试', () => {
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

  test('应该显示 Toast 消息', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 查找 Toast 触发按钮
    const showSuccessButton = page.getByRole('button', { name: /显示成功.*Toast/i }).first()
    await expect(showSuccessButton).toBeVisible()
    await showSuccessButton.click()

    // 等待 Toast 出现
    await page.waitForTimeout(300)

    // 验证 Toast 可见
    const toast = page.locator('[role="alert"]').first()
    await expect(toast).toBeVisible()

    // 验证 Toast 内容
    await expect(toast).toContainText('操作成功')
  })

  test('Toast 应该有正确的类型样式', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 测试成功类型
    const showSuccessButton = page.getByRole('button', { name: /显示成功.*Toast/i })
    await showSuccessButton.click()
    await page.waitForTimeout(300)

    const successToast = page.locator('[role="alert"]').first()
    const successBorder = await successToast.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.borderLeftColor
    })
    expect(successBorder).toBe('rgb(16, 185, 129)') // success color

    // 等待 Toast 消失
    await page.waitForTimeout(3500)
    await expect(successToast).not.toBeVisible()

    // 测试错误类型
    const showErrorButton = page.getByRole('button', { name: /显示错误.*Toast/i })
    await showErrorButton.click()
    await page.waitForTimeout(300)

    const errorToast = page.locator('[role="alert"]').first()
    const errorBorder = await errorToast.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.borderLeftColor
    })
    expect(errorBorder).toBe('rgb(239, 68, 68)') // danger color
  })

  test('Toast 应该可以手动关闭', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 显示 Toast
    const showButton = page.getByRole('button', { name: /显示.*Toast.*手动关闭/i })
    await showButton.click()
    await page.waitForTimeout(300)

    const toast = page.locator('[role="alert"]').first()
    await expect(toast).toBeVisible()

    // 点击关闭按钮
    const closeButton = toast.locator('button[aria-label="关闭"]')
    await closeButton.click()
    await page.waitForTimeout(300)

    // 验证 Toast 消失
    await expect(toast).not.toBeVisible()
  })

  test('Toast 应该有进入和退出动画', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    const showButton = page.getByRole('button', { name: /显示成功.*Toast/i })
    await showButton.click()

    const toast = page.locator('[role="alert"]').first()

    // 检查初始位置（应该从右侧滑入）
    await page.waitForTimeout(100)
    const initialTransform = await toast.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.transform
    })

    // 动画完成后，transform 应该为 none 或 translateX(0)
    await page.waitForTimeout(300)
    const finalTransform = await toast.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.transform
    })

    // 验证动画发生了
    expect(initialTransform).not.toBe(finalTransform)
  })

  test('Toast 应该显示在右上角', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 显示 Toast
    const showButton = page.getByRole('button', { name: /左上角/i })
    await showButton.click()
    await page.waitForTimeout(300)

    const toast = page.locator('[role="alert"]').first()
    await expect(toast).toBeVisible()

    // 检查位置（应该在右上角附近）
    const toastPosition = await toast.evaluate(el => {
      const rect = el.getBoundingClientRect()
      return {
        top: rect.top,
        right: window.innerWidth - rect.right,
        left: rect.left
      }
    })

    // 验证靠近右上角（距离右边和顶部都小于100px）
    expect(toastPosition.top).toBeLessThan(100)
    expect(toastPosition.right).toBeLessThan(100)
  })

  test('Toast 应该自动关闭', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 显示一个 2 秒后自动关闭的 Toast
    const showButton = page.getByRole('button', { name: /显示.*Toast.*2秒/i })
    await showButton.click()
    await page.waitForTimeout(300)

    const toast = page.locator('[role="alert"]').first()
    await expect(toast).toBeVisible()

    // 等待自动关闭
    await page.waitForTimeout(2500)
    await expect(toast).not.toBeVisible()
  })

  test('Toast 应该显示图标', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    const showButton = page.getByRole('button', { name: /显示.*Toast/i })
    await showButton.first().click()
    await page.waitForTimeout(300)

    const toast = page.locator('[role="alert"]').first()
    const icon = toast.locator('svg').first()

    // 验证图标存在
    await expect(icon).toBeVisible()
  })

  test('多个 Toast 应该堆叠显示', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 使用"显示多个 Toast"按钮
    const showMultipleButton = page.getByRole('button', { name: /显示多个.*Toast/i })
    await showMultipleButton.click()

    // 等待所有 Toast 都出现
    await page.waitForTimeout(1500)

    // 验证所有 Toast 都可见
    const toasts = page.locator('[role="alert"]')
    const count = await toasts.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('Toast 应该有无障碍支持', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // 使用成功 Toast
    const showButton = page.getByRole('button', { name: /显示成功.*Toast/i })
    await showButton.click()

    // 验证 Toast 可见
    const toast = page.locator('[role="alert"]').first()
    await expect(toast).toBeVisible()

    // 验证 role 属性
    await expect(toast).toHaveAttribute('role', 'alert')

    // 验证 aria-live 属性
    await expect(toast).toHaveAttribute('aria-live', 'polite')

    // 关闭按钮在 closable 为 true 时显示
    // 这里只验证 Toast 的基本无障碍属性
  })
})
