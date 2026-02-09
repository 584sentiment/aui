import { test, expect } from '@playwright/test';

const components = [
  'Button', 'Input', 'Select', 'Modal', 'Switch',
  'Pagination', 'Form', 'Tabs', 'DatePicker', 'Timeline'
];

test.describe('组件页面全面测试', () => {
  test.beforeAll(async () => {
    console.log('\n=== 组件页面全面测试开始 ===\n');
  });

  components.forEach(component => {
    test(`${component} - 完整功能验证`, async ({ page }) => {
      console.log(`\n测试组件: ${component}`);
      console.log('='.repeat(60));

      // 1. 访问页面
      const url = `/components/${component}`;
      console.log(`1. 访问页面: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(3000);

      // 2. 检查页面加载
      console.log('2. 检查页面加载状态...');
      const bodyText = await page.locator('body').textContent();

      // 验证没有"组件未找到"错误
      const hasNotFound = bodyText.includes('组件未找到') ||
                         bodyText.includes('Component not found') ||
                         bodyText.includes('404');

      expect(hasNotFound, '页面不应显示"组件未找到"错误').toBe(false);
      console.log('   ✓ 没有发现"组件未找到"错误');

      // 验证页面包含组件名称
      const hasComponentName = bodyText.toLowerCase().includes(component.toLowerCase());
      console.log(`   ${hasComponentName ? '✓' : '✗'} 包含组件名称: ${component}`);

      // 3. 检查是否有可交互的组件元素
      console.log('\n3. 检查可交互元素...');

      // 检查按钮
      const buttons = page.locator('button:not([disabled])');
      const buttonCount = await buttons.count();
      console.log(`   - 可点击按钮: ${buttonCount} 个`);

      // 检查输入框
      const inputs = page.locator('input:not([disabled]), textarea:not([disabled])');
      const inputCount = await inputs.count();
      console.log(`   - 可输入字段: ${inputCount} 个`);

      // 4. 测试交互功能
      console.log('\n4. 测试交互功能...');

      // 测试按钮点击（如果有）
      if (buttonCount > 0) {
        const firstButton = buttons.first();
        try {
          await firstButton.click({ timeout: 2000 });
          console.log('   ✓ 按钮可点击');
        } catch (e) {
          console.log('   ⚠ 按钮点击失败（可能被其他元素遮挡）');
        }
      }

      // 测试输入（如果有）
      if (inputCount > 0) {
        const firstInput = inputs.first();
        try {
          await firstInput.fill('test input');
          console.log('   ✓ 输入框可输入');
        } catch (e) {
          console.log('   ⚠ 输入框测试失败');
        }
      }

      // 5. 检查代码块和复制功能
      console.log('\n5. 检查代码块功能...');

      // 检查是否有代码块
      const codeBlocks = page.locator('pre, code[class*="language"], .demo-preview');
      const codeBlockCount = await codeBlocks.count();
      console.log(`   - 代码块/预览区: ${codeBlockCount} 个`);

      // 检查复制按钮
      const copyButtons = page.locator('button:has-text("复制"), button[title*="复制"], button[aria-label*="复制"], .copy-button');
      const copyButtonCount = await copyButtons.count();
      console.log(`   - 复制按钮: ${copyButtonCount} 个`);

      if (copyButtonCount > 0) {
        // 测试复制功能
        const firstCopyButton = copyButtons.first();
        try {
          await firstCopyButton.click({ timeout: 2000 });
          await page.waitForTimeout(500);
          console.log('   ✓ 复制按钮可点击');
        } catch (e) {
          console.log('   ⚠ 复制按钮测试失败');
        }
      }

      // 检查查看代码/隐藏代码按钮
      const toggleCodeButtons = page.locator('button:has-text("查看代码"), button:has-text("隐藏代码"), button:has-text("View Code")');
      const toggleCount = await toggleCodeButtons.count();
      console.log(`   - 切换代码显示按钮: ${toggleCount} 个`);

      // 6. 检查 Console 错误和警告
      console.log('\n6. 检查 Console 错误...');

      const errors: string[] = [];
      const warnings: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        } else if (msg.type() === 'warning') {
          warnings.push(msg.text());
        }
      });

      // 等待一下收集 console 消息
      await page.waitForTimeout(1000);

      console.log(`   - 错误数量: ${errors.length}`);
      console.log(`   - 警告数量: ${warnings.length}`);

      if (errors.length > 0) {
        console.log('   错误详情:');
        errors.slice(0, 3).forEach(err => console.log(`     • ${err.substring(0, 100)}`));
      }

      if (warnings.length > 0 && warnings.length < 10) {
        console.log('   警告详情:');
        warnings.slice(0, 3).forEach(warn => console.log(`     • ${warn.substring(0, 100)}`));
      }

      // 7. 检查 Demo 容器
      console.log('\n7. 检查 Demo 容器...');

      const demoContainers = page.locator('.demo-container, .vitepress-demo-plugin, [class*="demo"]');
      const demoCount = await demoContainers.count();
      console.log(`   - Demo 容器: ${demoCount} 个`);

      // 8. 截图保存
      console.log('\n8. 保存截图...');
      await page.screenshot({
        path: `test-results/${component}-full-test.png`,
        fullPage: true
      });
      console.log('   ✓ 截图已保存');

      // 9. 总结
      console.log('\n' + '='.repeat(60));
      console.log(`✅ ${component} 测试完成`);
      console.log(`   - 无"组件未找到"错误: ✓`);
      console.log(`   - 可交互元素: ${buttonCount + inputCount} 个`);
      console.log(`   - 代码相关功能: ${codeBlockCount} 个代码块, ${copyButtonCount} 个复制按钮`);
      console.log(`   - Console 错误: ${errors.length} 个`);
      console.log(`   - Console 警告: ${warnings.length} 个`);
    });
  });

  test('生成最终测试报告', async ({ page }) => {
    console.log('\n' + '='.repeat(60));
    console.log('=== 全部测试完成 ===');
    console.log(`测试组件总数: ${components.length}`);
    console.log('详细测试结果已保存在 test-results/ 目录');
    console.log('='.repeat(60) + '\n');
  });
});
