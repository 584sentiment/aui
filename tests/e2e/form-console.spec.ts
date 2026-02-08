import { test, expect } from '@playwright/test'

test.describe('Form 组件浏览器控制台详细测试', () => {
  test('详细检查 Form 页面控制台', async ({ page }) => {
    // 在页面中注入脚本来捕获所有控制台消息
    await page.addInitScript(() => {
      (window as any).__consoleMessages = []
      const originalError = console.error
      const originalWarn = console.warn

      console.error = function(...args) {
        ;(window as any).__consoleMessages.push({ type: 'error', args: args.map(a => String(a)) })
        originalError.apply(console, args)
      }

      console.warn = function(...args) {
        ;(window as any).__consoleMessages.push({ type: 'warning', args: args.map(a => String(a)) })
        originalWarn.apply(console, args)
      }
    })

    // 监听页面错误
    const pageErrors: string[] = []
    page.on('pageerror', error => {
      pageErrors.push(error.message)
      console.log(`[页面错误] ${error.message}`)
    })

    // 访问 Form 文档页面
    await page.goto('http://localhost:5175/components/Form.html')

    // 等待页面完全加载
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)

    // 从页面中获取捕获的控制台消息
    const consoleMessages = await page.evaluate(() => (window as any).__consoleMessages || [])

    console.log(`\n=== 控制台消息摘要 ===`)
    console.log(`捕获到的消息数: ${consoleMessages.length}`)
    console.log(`页面错误数: ${pageErrors.length}`)

    if (consoleMessages.length > 0) {
      console.log('\n所有控制台消息:')
      consoleMessages.forEach((msg: any, i: number) => {
        console.log(`  ${i + 1}. [${msg.type}] ${msg.args.join(' ')}`)
      })
    }

    if (pageErrors.length > 0) {
      console.log('\n所有页面错误:')
      pageErrors.forEach((err, i) => {
        console.log(`  ${i + 1}. ${err}`)
      })
    }

    // 检查是否有 Vue 相关的错误或警告
    const vueErrors = consoleMessages.filter((m: any) =>
      m.args.some((a: string) => a.includes('[Vue warn]') || a.includes('Uncaught'))
    )

    if (vueErrors.length > 0) {
      console.error('\n发现 Vue 错误/警告:')
      vueErrors.forEach((err: any) => console.error(`  - ${err.type}: ${err.args.join(' ')}`))
    }

    // 截图保存
    await page.screenshot({ path: 'test-results/form-screenshot.png', fullPage: true })
    console.log('\n截图已保存到: test-results/form-screenshot.png')

    // 断言：不应该有任何错误
    expect(pageErrors.length, `发现 ${pageErrors.length} 个页面错误`).toBe(0)
    expect(vueErrors.length, `发现 ${vueErrors.length} 个 Vue 警告/错误`).toBe(0)
  })

  test('表单交互并检查控制台', async ({ page }) => {
    const errors: string[] = []

    // 监听所有类型的消息
    page.on('console', msg => {
      const text = msg.text()
      if (msg.type() === 'error' || msg.type() === 'warning' || text.includes('[Vue warn]')) {
        errors.push(`[${msg.type()}] ${text}`)
        console.log(`[捕获] ${msg.type()}: ${text}`)
      }
    })

    page.on('pageerror', error => {
      errors.push(`[pageerror] ${error.message}`)
      console.log(`[捕获] pageerror: ${error.message}`)
    })

    await page.goto('http://localhost:5175/components/Form.html')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    // 查找并交互表单
    const form = page.locator('form').first()
    await expect(form).toBeVisible()

    // 尝试输入并提交
    const usernameInput = page.locator('input[placeholder*="用户名"]').first()
    await usernameInput.fill('test')
    await page.waitForTimeout(500)

    const emailInput = page.locator('input[placeholder*="邮箱"]').first()
    await emailInput.fill('test@example.com')
    await page.waitForTimeout(500)

    const submitButton = page.locator('button:has-text("提交")').first()
    await submitButton.click()
    await page.waitForTimeout(2000)

    console.log(`\n=== 交互测试消息摘要 ===`)
    console.log(`捕获的错误/警告数: ${errors.length}`)

    if (errors.length > 0) {
      console.error('\n所有错误/警告:')
      errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`))
    }

    expect(errors.length, `发现 ${errors.length} 个错误/警告`).toBe(0)
  })
})
