# 设计令牌

Job-Ai 组件库基于统一的设计令牌系统，确保所有组件风格一致。

## 颜色

### 主色调

```css
--color-primary: #2563EB        /* 主色 */
--color-primary-hover: #1D4ED8  /* 主色悬停 */
--color-primary-light: #DBEAFE  /* 主色浅色 */
--color-secondary: #3B82F6      /* 辅助色 */
--color-cta: #F97316            /* CTA 颜色 */
```

### 中性色

```css
--color-background: #F8FAFC     /* 背景色 */
--color-surface: #FFFFFF        /* 表面色 */
--color-text: #1E293B           /* 主文本 */
--color-text-secondary: #64748B /* 次要文本 */
--color-text-light: #94A3B8     /* 浅色文本 */
--color-border: #E2E8F0         /* 边框 */
```

### 语义色

```css
--color-danger: #EF4444         /* 危险 */
--color-success: #10B981        /* 成功 */
--color-warning: #F59E0B        /* 警告 */
```

## 字体

```css
--font-sans: 'Open Sans', sans-serif     /* 正文字体 */
--font-heading: 'Poppins', sans-serif    /* 标题字体 */
```

## 圆角

```css
--rounded-sm: 0.25rem
--rounded-md: 0.5rem
--rounded-lg: 0.75rem
--rounded-xl: 1rem
```

## 阴影

```css
--shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.05)
--shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.08)
--shadow-strong: 0 8px 24px rgba(0, 0, 0, 0.12)
```

## 间距

基于 Tailwind CSS 的间距系统：

```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 0.75rem  /* 12px */
--spacing-md: 1rem     /* 16px */
--spacing-lg: 1.5rem   /* 24px */
--spacing-xl: 2rem     /* 32px */
```

## 在自定义组件中使用

您可以在自定义组件中使用这些设计令牌：

```vue
<template>
  <div class="my-component">
    <button class="btn">按钮</button>
  </div>
</template>

<style scoped>
.my-component {
  background-color: var(--color-background);
  color: var(--color-text);
  padding: var(--spacing-md);
  border-radius: var(--rounded-lg);
}
</style>
```

## 自定义主题

如需自定义主题，可以通过 CSS 变量覆盖：

```css
:root {
  --color-primary: #your-color;
  --font-sans: 'Your Font', sans-serif;
  /* ... 其他变量 */
}
```
