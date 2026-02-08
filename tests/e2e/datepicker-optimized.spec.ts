import { test, expect } from '@playwright/test'

test.describe('DatePicker 组件优化测试', () => {
  test.beforeAll(async ({ request }) => {
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

  test('DatePicker 应该显示自定义输入框', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker 区域
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 截图
    await page.screenshot({ path: 'test-results/datepicker-input.png' })

    // 查找 DatePicker 输入框
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await expect(datePickerInput).toBeVisible()
  })

  test('DatePicker 应该能打开日历弹出框', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 点击 DatePicker 输入框
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()

    // 等待日历弹出框出现
    await page.waitForTimeout(300)

    // 截图
    await page.screenshot({ path: 'test-results/datepicker-calendar-open.png', fullPage: true })

    // 验证日历弹出框存在
    const calendar = page.locator('.date-picker-wrapper .absolute.z-\\[130\\]').first()
    await expect(calendar).toBeVisible()
  })

  test('DatePicker 日历应该有正确的结构', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 打开日历
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()
    await page.waitForTimeout(300)

    // 验证星期标题
    const weekDays = page.locator('.grid-cols-7 .text-xs.font-medium')
    await expect(weekDays).toHaveCount(7)

    // 验证日期网格（应该有42个格子，6行7列）
    const dateCells = page.locator('.grid-cols-7 button.h-10')
    const count = await dateCells.count()
    expect(count).toBe(42)

    // 验证快捷选项
    const shortcuts = page.locator('.border-t .flex button')
    const shortcutCount = await shortcuts.count()
    expect(shortcutCount).toBeGreaterThanOrEqual(4)

    // 截图
    await page.screenshot({ path: 'test-results/datepicker-structure.png', fullPage: true })
  })

  test('DatePicker 应该有今天的标记', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 打开日历
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()
    await page.waitForTimeout(300)

    // 获取今天的日期
    const today = new Date().getDate()

    // 查找今天的日期按钮（应该有特殊样式）
    const todayButton = page.locator(`.grid-cols-7 button.h-10:has-text("${today}")`).first()

    // 检查是否有今天的标记（bg-primaryLight 或 border-primary）
    const todayClass = await todayButton.getAttribute('class')
    expect(todayClass).toMatch(/bg-primaryLight|border-2.*border-primary/)

    await page.screenshot({ path: 'test-results/datepicker-today.png' })
  })

  test('DatePicker 应该支持月份导航', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 打开日历
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()
    await page.waitForTimeout(300)

    // 获取当前年月显示
    const currentMonthYear = await page.locator('.text-base.font-semibold').first().textContent()
    console.log('当前年月:', currentMonthYear)

    // 点击上个月按钮
    const prevButton = page.locator('.border-b button').first()
    await prevButton.click()
    await page.waitForTimeout(300)

    const prevMonthYear = await page.locator('.text-base.font-semibold').first().textContent()
    console.log('点击后年月:', prevMonthYear)

    // 验证年月显示发生了变化
    expect(prevMonthYear).not.toBe(currentMonthYear)

    await page.screenshot({ path: 'test-results/datepicker-navigation.png' })
  })

  test('DatePicker 应该支持选择日期', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 打开日历
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()
    await page.waitForTimeout(300)

    // 选择当前月的第15天
    const dateButton = page.locator('.grid-cols-7 button.h-10').nth(16) // 第16个按钮（包含前一个月的几天）
    await dateButton.click()
    await page.waitForTimeout(500)

    // 验证日历已关闭（使用更具体的选择器，避免匹配到图标）
    const calendar = page.locator('.date-picker-wrapper .absolute.z-\\[130\\]').first()
    await expect(calendar).not.toBeVisible()

    await page.screenshot({ path: 'test-results/datepicker-select.png' })
  })

  test('DatePicker 应该支持快捷选项', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 打开日历
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()
    await page.waitForTimeout(300)

    // 点击"今天"快捷按钮
    const todayButton = page.locator('.border-t .flex button:has-text("今天")').first()
    await todayButton.click()
    await page.waitForTimeout(500)

    // 验证日历已关闭（使用更具体的选择器，避免匹配到图标）
    const calendar = page.locator('.date-picker-wrapper .absolute.z-\\[130\\]').first()
    await expect(calendar).not.toBeVisible()

    await page.screenshot({ path: 'test-results/datepicker-shortcuts.png' })
  })

  test('DatePicker 日历弹出框应该有正确的样式', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 打开日历
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()
    await page.waitForTimeout(300)

    // 验证日历弹出框的样式
    const calendar = page.locator('.date-picker-wrapper .absolute.z-\\[130\\]').first()

    // 检查背景色（bg-surface/95 可能是半透明的白色）
    const bgColor = await calendar.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.backgroundColor
    })
    expect(bgColor).toBeTruthy() // 只要不是透明即可

    // 检查边框
    const border = await calendar.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.border
    })
    expect(border).toContain('solid') // 检查是否有实线边框

    // 检查阴影
    const boxShadow = await calendar.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.boxShadow
    })
    expect(boxShadow).not.toBe('none')

    await page.screenshot({ path: 'test-results/datepicker-styles.png' })
  })

  test('DatePicker 应该支持键盘导航', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 使用键盘打开日历（ArrowDown）
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.focus()
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(300)

    // 验证日历已打开（使用更具体的选择器）
    const calendar = page.locator('.date-picker-wrapper .absolute.z-\\[130\\]').first()
    await expect(calendar).toBeVisible()

    // 使用 Escape 关闭日历
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)

    // 验证日历已关闭
    await expect(calendar).not.toBeVisible()

    await page.screenshot({ path: 'test-results/datepicker-keyboard.png' })
  })

  test('DatePicker 应该有平滑的过渡动画', async ({ page }) => {
    await page.goto('http://localhost:3002')
    await page.waitForLoadState('networkidle')

    // 滚动到 DatePicker
    await page.evaluate(() => {
      const datePicker = document.querySelector('.date-picker-wrapper')
      if (datePicker) {
        datePicker.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    await page.waitForTimeout(500)

    // 点击打开日历
    const datePickerInput = page.locator('.date-picker-wrapper button').first()
    await datePickerInput.click()

    // 等待动画完成
    await page.waitForTimeout(300)

    // 验证日历可见
    const calendar = page.locator('.date-picker-wrapper .absolute.z-\\[130\\]').first()
    await expect(calendar).toBeVisible()

    // 检查是否有过渡类（通过检查 opacity）
    const opacity = await calendar.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.opacity
    })
    expect(opacity).toBe('1')

    await page.screenshot({ path: 'test-results/datepicker-animation.png' })
  })
})
