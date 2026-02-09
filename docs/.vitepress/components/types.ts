/**
 * DemoContainer 组件的 Props 类型定义
 */
export interface DemoContainerProps {
  /**
   * 渲染后的代码 HTML（经过语法高亮处理）
   */
  source: string

  /**
   * 示例文件路径
   */
  path: string

  /**
   * 原始源代码（URL 编码）
   */
  rawSource: string

  /**
   * 描述文字（URL 编码，可选）
   */
  description?: string
}
