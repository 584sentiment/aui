import { test, expect } from '@playwright/test'

test.describe('Form 表单组件测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('input, button', { timeout: 5000 })
  })

  test('Input 组件应该正常工作', async ({ page }) => {
    // 滚动到表单区域
    await page.getByText('Form 表单组件').scrollIntoViewIfNeeded()

    // 找到用户名输入框
    const usernameInput = page.getByLabel('用户名')
    await expect(usernameInput).toBeVisible()

    // 输入文本
    await usernameInput.fill('测试用户')

    // 验证双向绑定
    const display = page.getByText(/用户名:/)
    await expect(display).toContainText('测试用户')
  })

  test('邮箱输入框应该接受有效的邮箱格式', async ({ page }) => {
    await page.getByText('Form 表单组件').scrollIntoViewIfNeeded()

    const emailInput = page.getByLabel('邮箱')
    await expect(emailInput).toHaveAttribute('type', 'email')

    await emailInput.fill('test@example.com')

    // 验证输入成功
    await expect(emailInput).toHaveValue('test@example.com')
  })

  test('密码输入框应该隐藏输入内容', async ({ page }) => {
    await page.getByText('Form 表单组件').scrollIntoViewIfNeeded()

    const passwordInput = page.getByLabel('密码')
    await expect(passwordInput).toHaveAttribute('type', 'password')

    await passwordInput.fill('testpassword')

    // 验证输入成功
    await expect(passwordInput).toHaveValue('testpassword')
  })

  test('Select 组件应该正常工作', async ({ page }) => {
    await page.getByText('Select & Switch').scrollIntoViewIfNeeded()

    // 点击 Select 触发器
    const selectTrigger = page.locator('button').filter({ hasText: '请选择城市' }).first()
    await expect(selectTrigger).toBeVisible()

    // 打开下拉列表
    await selectTrigger.click()

    // 等待选项出现
    await page.waitForSelector('li[role="option"]')

    // 选择一个选项
    await page.getByRole('option', { name: '北京' }).click()

    // 验证选择结果
    const display = page.getByText(/选择:/)
    await expect(display).toContainText('beijing')
  })

  test('Switch 组件应该可以切换', async ({ page }) => {
    await page.getByText('Select & Switch').scrollIntoViewIfNeeded()

    const switchButton = page.getByRole('switch', { name: /启用通知/ })
    await expect(switchButton).toBeVisible()

    // 获取初始状态
    const initialState = await switchButton.getAttribute('aria-checked')
    expect(initialState).toBe('false')

    // 点击切换
    await switchButton.click()

    // 验证状态改变
    const newState = await switchButton.getAttribute('aria-checked')
    expect(newState).toBe('true')

    // 验证显示更新
    const display = page.getByText(/通知状态:/)
    await expect(display).toContainText('开启')
  })

  test('DatePicker 应该可以选择日期', async ({ page }) => {
    await page.getByText('Select & Switch').scrollIntoViewIfNeeded()

    const dateInput = page.getByLabel('生日')
    await expect(dateInput).toBeVisible()

    // 输入日期
    await dateInput.fill('2026-02-08')

    // 验证输入成功
    const display = page.getByText(/生日:/)
    await expect(display).toContainText('2026-02-08')
  })
})
