import { test, expect } from '@playwright/test'

test.describe('完整表单验证测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('button', { timeout: 5000 })
  })

  test('应该显示所有表单字段', async ({ page }) => {
    await page.getByText('完整表单示例').scrollIntoViewIfNeeded()

    await expect(page.getByLabel('姓名')).toBeVisible()
    await expect(page.getByLabel('邮箱')).toBeVisible()
    await expect(page.getByText(/角色/)).toBeVisible() // Select
    await expect(page.getByRole('switch', { name: /我同意/ })).toBeVisible()
  })

  test('应该验证必填字段', async ({ page }) => {
    await page.getByText('完整表单示例').scrollIntoViewIfNeeded()

    // 不填写任何内容直接提交
    await page.getByRole('button', { name: '提交' }).click()

    // 等待验证错误显示
    await page.waitForTimeout(500)

    // 验证错误提示
    await expect(page.getByText('请输入姓名')).toBeVisible()
    await expect(page.getByText('请输入邮箱')).toBeVisible()
    await expect(page.getByText('请选择角色')).toBeVisible()
  })

  test('应该能够成功提交表单', async ({ page }) => {
    await page.getByText('完整表单示例').scrollIntoViewIfNeeded()

    // 填写表单
    await page.getByLabel('姓名').fill('测试用户')
    await page.getByLabel('邮箱').fill('test@example.com')

    // 选择角色
    const selectTrigger = page.locator('button').filter({ hasText: '请选择角色' }).nth(1)
    await selectTrigger.click()
    await page.waitForTimeout(300)
    await page.getByRole('option', { name: '开发者' }).click()

    // 同意条款
    await page.getByRole('switch', { name: /我同意/ }).click()

    // 提交表单
    await page.getByRole('button', { name: '提交' }).click()

    // 验证成功消息
    await expect(page.getByText('✓ 表单提交成功！')).toBeVisible()

    // 验证成功消息在 3 秒后消失
    await page.waitForTimeout(3500)
    await expect(page.getByText('✓ 表单提交成功！')).not.toBeVisible()
  })

  test('重置按钮应该清空表单', async ({ page }) => {
    await page.getByText('完整表单示例').scrollIntoViewIfNeeded()

    // 填写表单
    await page.getByLabel('姓名').fill('测试用户')
    await page.getByLabel('邮箱').fill('test@example.com')

    // 点击重置
    await page.getByRole('button', { name: '重置' }).click()

    // 验证字段已清空
    await expect(page.getByLabel('姓名')).toHaveValue('')
    await expect(page.getByLabel('邮箱')).toHaveValue('')
  })

  test('应该正确显示双向绑定', async ({ page }) => {
    await page.getByText('完整表单示例').scrollIntoViewIfNeeded()

    const nameInput = page.getByLabel('姓名')

    // 输入文本
    await nameInput.fill('测试')

    // 验证输入成功
    await expect(nameInput).toHaveValue('测试')
  })
})
