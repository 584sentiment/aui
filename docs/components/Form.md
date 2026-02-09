# Form 表单

表单容器组件，提供表单验证功能。

## 基础用法

:::demo 基础用法
form/basic
:::

## 表单验证

:::demo 表单验证
form/validation
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据 | `Record<string, any>` | - |
| rules | 验证规则 | `FormRules` | - |
| labelWidth | 标签宽度 | `string` | `'120px'` |
| labelPosition | 标签位置 | `'left' \| 'top' \| 'right'` | `'top'` |
| disabled | 是否禁用整个表单 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| submit | 表单提交 | `model: Record<string, any>` |
| reset | 表单重置 | - |

### FormRules 类型

```typescript
type FormRuleType = 'required' | 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern'

interface FormRule {
  type?: FormRuleType
  required?: boolean
  message?: string
  validator?: (value: any) => boolean | string
  min?: number
  max?: number
  pattern?: RegExp
}

type FormRules = Record<string, FormRule | FormRule[]>
```
