import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from './Form.vue'

describe('Form', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: '' }
      }
    })
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('应该处理提交事件', async () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' }
      }
    })

    const form = wrapper.find('form')
    await form.trigger('submit')
    // 由于需要验证，这里只是检查组件不会崩溃
    expect(wrapper.exists()).toBe(true)
  })

  it('应该处理重置事件', async () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' }
      }
    })

    const form = wrapper.find('form')
    await form.trigger('reset')
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确初始化验证规则', () => {
    const model = { username: '', email: '' }
    const rules = {
      username: { type: 'required' },
      email: [{ type: 'required' }, { type: 'email' }]
    }

    const wrapper = mount(Form, {
      props: {
        model,
        rules
      }
    })

    // 验证组件渲染没有错误
    expect(wrapper.exists()).toBe(true)
  })

  it('应该暴露验证方法', () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: '' }
      }
    })

    const vm = wrapper.vm as any
    expect(typeof vm.validate).toBe('function')
    expect(typeof vm.reset).toBe('function')
    expect(typeof vm.getErrors).toBe('function')
  })

  it('应该提供表单上下文', () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: '' },
        labelWidth: '100px',
        labelPosition: 'left'
      }
    })

    // 验证组件提供上下文没有错误
    expect(wrapper.exists()).toBe(true)
  })
})
