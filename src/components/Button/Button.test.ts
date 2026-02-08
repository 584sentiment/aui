/**
 * Button 组件单元测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' }
    })
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' }
    })
    expect(wrapper.classes()).toContain('px-6')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('shows loading spinner when loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })
})
