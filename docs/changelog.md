# 更新日志

## [1.0.1] - 2025-02-13

### Form 表单组件
- **feat**: 优化 `label-position` 属性支持，新增 `left`、`right`、`top` 三种标签位置
- **feat**: FormField 组件支持 `labelWidth` 属性，可动态设置标签宽度
- **fix**: 修复 FormField 组件 inject 数据访问问题，需要通过 `.value` 获取数据
- **fix**: 在 `label-position="top"` 模式下添加 `text-align: left`，确保 label 左对齐

### 文档
- **docs**: 规范文档和示例结构，新增 `docs/examples/form/label-position.vue`
- **docs**: 更新 Form 组件文档，添加标签位置说明和示例
- **docs**: 新增更新日志页面

## [1.0.0] - 2025-02-12

### 首次发布

#### 基础组件
- **Icon 图标**: Lucide 图标组件
- **Button 按钮**: 支持多种样式和尺寸
- **Input 输入框**: 基础输入框组件
- **Switch 开关**: 开关切换组件

#### 表单组件
- **Select 选择器**: 下拉选择组件
- **DatePicker 日期选择**: 日期选择组件
- **Form 表单**: 表单容器，支持验证

#### 反馈组件
- **Modal 对话框**: 模态对话框组件

#### 导航组件
- **Tabs 标签页**: 标签页切换组件
- **Pagination 分页**: 分页组件

#### 数据展示
- **Timeline 时间轴**: 时间轴展示组件
