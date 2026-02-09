import { test, expect } from '@playwright/test';

test.describe('检查 VitePress 文档页面特征', () => {
  test('检查 Button 页面是否是真正的 VitePress 文档', async ({ page }) => {
    await page.goto('/components/Button');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('\n检查页面特征...\n');

    // 检查 VitePress 特征元素
    const hasSidebar = await page.locator('.sidebar, .VPDoc, .content').count() > 0;
    const hasNav = await page.locator('.nav-bar, .VPNav').count() > 0;
    const hasMainContent = await page.locator('.VPDoc, main').count() > 0;

    console.log(`- 侧边栏: ${hasSidebar ? '✓' : '✗'}`);
    console.log(`- 导航栏: ${hasNav ? '✓' : '✗'}`);
    console.log(`- 主内容区: ${hasMainContent ? '✓' : '✗'}`);

    // 检查页面标题
    const pageTitle = await page.title();
    console.log(`\n页面标题: ${pageTitle}`);

    // 获取页面文本内容
    const body = await page.locator('body').textContent();
    const bodyPreview = body.substring(0, 500);

    console.log(`\n页面内容预览:\n${bodyPreview}\n...`);

    // 检查是否包含 demo.html 的特征文本
    const isDemoPage = body.includes('组件库开发模式 这是一个交互式的组件测试环境');
    console.log(`\n是否为 demo.html 页面: ${isDemoPage ? '是 ⚠️' : '否 ✓'}`);

    // 截图
    await page.screenshot({ path: 'test-results/vitepress-check.png', fullPage: true });

    if (isDemoPage) {
      console.log('\n⚠️ 警告: 页面显示的是 demo.html 而不是 VitePress 文档！');
      console.log('建议检查路由配置或重命名 demo.html 文件');
    } else {
      console.log('\n✓ 页面是真正的 VitePress 文档页面');
    }
  });
});
