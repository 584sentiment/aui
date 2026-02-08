/**
 * 主题配置
 * 支持未来的深色模式等主题切换
 */

import { colors } from './tokens'

export const lightTheme = {
  colors: {
    ...colors
  }
} as const

export const darkTheme = {
  colors: {
    primary: '#3B82F6',
    primaryHover: '#60A5FA',
    primaryLight: '#1E3A8A',
    primaryDark: '#60A5FA',
    secondary: '#60A5FA',
    cta: '#FB923C',
    ctaHover: '#F97316',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textLight: '#64748B',
    border: '#334155',
    danger: '#F87171',
    success: '#34D399',
    warning: '#FBBF24'
  }
} as const

export type Theme = typeof lightTheme

export const defaultTheme = lightTheme
