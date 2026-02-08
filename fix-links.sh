# 修复所有组件文档的演示链接

# 将所有组件文档中的相对链接改为绝对 URL

files=(
  "/Users/wang/Documents/study/job-ai-components/docs/components/Button.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Input.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Modal.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Switch.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Select.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/DatePicker.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Form.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Tabs.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Pagination.md"
  "/Users/wang/Documents/study/job-ai-components/docs/components/Timeline.md"
)

for file in "${files[@]}"; do
  sed -i '' 's|\](/demo.html)|](http://localhost:5173/demo.html)|g' "$file"
  echo "✅ 已更新: $(basename $file)"
done
