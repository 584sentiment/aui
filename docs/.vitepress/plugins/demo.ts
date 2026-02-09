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
      const info = token.info.trim().match(/^demo\s*(.*)$/)

      // 获取描述文字（从 token.info 中提取）
      const description = info && info[1] ? info[1].trim() : ''

      // 开始标签
      if (token.nesting === 1) {
        // 获取示例文件路径（从容器内容中提取）
        // 容器内容是接下来的 token
        let demoPath = ''
        let contentIndex = idx + 1

        // 查找内容 token（可能是 inline 或其他类型）
        while (contentIndex < tokens.length && tokens[contentIndex].nesting === 0) {
          const contentToken = tokens[contentIndex]
          if (contentToken.type === 'inline' && contentToken.content) {
            // 提取文件路径（通常是第一行内容）
            const lines = contentToken.content.split('\n')
            const firstLine = lines[0].trim()
            // 检查是否是有效的文件路径格式（包含 / 或是简单的组件名）
            if (firstLine && (firstLine.includes('/') || /^[a-z]+$/.test(firstLine))) {
              demoPath = firstLine
              break
            }
          }
          contentIndex++
        }

        // 读取示例文件内容
        const rawSource = readDemoFile(demoPath)

        // 使用 markdown-it 渲染代码块，生成带高亮的 HTML
        const highlightedSource = md.render(`\`\`\`vue\n${rawSource}\n\`\`\``)

        // 编码源代码、高亮代码和描述以便在 HTML 属性中传递
        const encodedSource = encodeURIComponent(rawSource)
        const encodedHighlightedSource = encodeURIComponent(highlightedSource)
        const encodedDescription = encodeURIComponent(description)

        // 返回 DemoContainer 组件标签
        return `<DemoContainer path="${demoPath}" rawSource="${encodedSource}" source="${encodedHighlightedSource}" description="${encodedDescription}">`
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
