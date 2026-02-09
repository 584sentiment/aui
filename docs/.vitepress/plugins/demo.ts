import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownIt from 'markdown-it'

/**
 * 自定义 Demo 容器插件
 *
 * 功能：
 * 1. 解析 :::demo 容器
 * 2. 读取 docs/examples/ 中的示例文件
 * 3. 生成 DemoContainer 组件的标签
 * 4. 生成带代码高亮的 source
 */
export const createDemoPlugin = () => {
  const md = new MarkdownIt()

  return {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      const token = tokens[idx]
      const m = token.info.trim().match(/^demo\s*(.*)$/)

      // 开始标签
      if (token.nesting === 1) {
        // 获取描述文字
        const description = m && m.length > 1 ? m[1] : ''

        // 获取源文件路径 - 参考Element Plus从 tokens[idx + 2] 获取
        const sourceFileToken = tokens[idx + 2]
        let sourceFile = ''
        let source = ''

        // 检查 token 类型是否为 'inline'
        if (sourceFileToken?.type === 'inline') {
          // 从 children 中获取文件路径
          sourceFile = sourceFileToken.children?.[0]?.content ?? ''
          // 移除 .vue 后缀（如果有）
          sourceFile = sourceFile.replace(/\.vue$/, '')

          // 读取示例文件内容
          if (sourceFile) {
            source = readDemoFile(sourceFile)
          }
        }

        // 使用 markdown-it 渲染代码块，生成带高亮的 HTML
        const highlightedSource = md.render(`\`\`\`vue\n${source}\n\`\`\``)

        // 编码源代码、高亮代码和描述以便在 HTML 属性中传递
        const encodedSource = encodeURIComponent(source)
        const encodedHighlightedSource = encodeURIComponent(highlightedSource)
        const encodedDescription = encodeURIComponent(description)

        // 将路径转换为组件名（button/basic -> button-basic）
        const componentName = sourceFile.replace(/\//g, '-')

        // 返回 DemoContainer 组件标签，包含 slot 内容
        // 参考 Element Plus 的实现，使用换行符确保格式正确
        return `<DemoContainer path="${sourceFile}" rawSource="${encodedSource}" source="${encodedHighlightedSource}" description="${encodedDescription}">
  <template #source><${componentName}/></template>`
      }

      // 结束标签
      return '</DemoContainer>'
    }
  }
}

/**
 * 从示例文件读取代码内容
 * @param filePath 示例文件相对路径
 * @returns 示例文件的代码内容
 */
export function readDemoFile(filePath: string): string {
  const docRoot = join(__dirname, '../../')
  const examplesDir = join(docRoot, 'examples')

  // 处理路径：移除可能存在的 .vue 扩展名，然后统一添加
  const cleanPath = filePath.replace(/\.vue$/, '')
  const fullPath = join(examplesDir, `${cleanPath}.vue`)

  // 忽略空路径
  if (!cleanPath.trim()) {
    console.warn('示例文件路径为空，跳过读取')
    return '<!-- 跳过空路径 -->'
  }

  try {
    return readFileSync(fullPath, 'utf-8')
  } catch (error) {
    console.error(`读取示例文件失败: ${fullPath}`, error)
    return '// 加载示例文件失败'
  }
}

export default createDemoPlugin
