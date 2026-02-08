<template>
  <div class="date-picker-wrapper relative">
    <label v-if="label" :for="datePickerId" class="block text-sm font-medium text-text mb-1">
      {{ label }}
    </label>

    <div class="relative">
      <!-- 自定义输入框 -->
      <button
        :id="datePickerId"
        type="button"
        :class="inputClasses"
        :disabled="disabled"
        @click="togglePopover"
        @keydown="handleKeydown"
      >
        <span class="block truncate">
          {{ displayValue }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg class="w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
      </button>

      <!-- 清除按钮 -->
      <button
        v-if="modelValue && !disabled && showClearButton"
        type="button"
        class="absolute inset-y-0 right-8 flex items-center pr-2 text-text-light hover:text-danger transition-colors"
        @click="clearValue"
        @keydown.enter="clearValue"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 日历弹出框 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-[130] mt-2 w-full sm:w-80 rounded-lg bg-surface shadow-medium border border-border"
      >
        <!-- 日视图 -->
        <template v-if="viewMode === 'days'">
          <!-- 日历头部：年月导航 -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-border">
            <button
              type="button"
              class="p-1 hover:bg-background rounded transition-colors"
              @click="previousMonth"
              @keydown.enter="previousMonth"
            >
              <svg class="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              class="text-base font-semibold text-text hover:text-primary transition-colors"
              @click="toggleYearMonthView"
            >
              {{ currentMonthYear }}
            </button>

            <button
              type="button"
              class="p-1 hover:bg-background rounded transition-colors"
              @click="nextMonth"
              @keydown.enter="nextMonth"
            >
              <svg class="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- 星期标题 -->
          <div class="grid grid-cols-7 gap-1 px-4 py-2">
            <div
              v-for="day in weekDays"
              :key="day"
              class="text-center text-xs font-medium text-text-secondary py-1"
            >
              {{ day }}
            </div>
          </div>

          <!-- 日期网格 -->
          <div class="grid grid-cols-7 gap-1 px-4 py-2">
            <button
              v-for="date in calendarDates"
              :key="date.key"
              type="button"
              :class="dateClasses(date)"
              :disabled="date.disabled"
              @click="selectDate(date)"
              @keydown.enter="selectDate(date)"
            >
              {{ date.day }}
            </button>
          </div>

          <!-- 快捷选项 -->
          <div v-if="showShortcuts" class="border-t border-border px-4 py-3">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="shortcut in shortcuts"
                :key="shortcut.label"
                type="button"
                class="px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-primaryLight hover:text-primary hover:border-primary transition-all"
                @click="selectShortcut(shortcut.value)"
                @keydown.enter="selectShortcut(shortcut.value)"
              >
                {{ shortcut.label }}
              </button>
            </div>
          </div>

          <!-- 底部操作按钮 -->
          <div class="flex items-center justify-between px-4 py-3 border-t border-border">
            <button
              type="button"
              class="px-3 py-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
              @click="selectToday"
              @keydown.enter="selectToday"
            >
              今天
            </button>
            <button
              type="button"
              class="px-4 py-1.5 text-sm font-medium text-text hover:text-danger transition-colors"
              @click="clearValue"
              @keydown.enter="clearValue"
            >
              清除
            </button>
          </div>
        </template>

        <!-- 月份选择视图 -->
        <template v-else-if="viewMode === 'months'">
          <!-- 月份选择头部 -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-border">
            <button
              type="button"
              class="p-1 hover:bg-background rounded transition-colors"
              @click="previousMonth"
              @keydown.enter="previousMonth"
            >
              <svg class="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              class="text-base font-semibold text-text hover:text-primary transition-colors"
              @click="viewMode = 'years'"
            >
              {{ currentYear }}年
            </button>

            <button
              type="button"
              class="p-1 hover:bg-background rounded transition-colors"
              @click="nextMonth"
              @keydown.enter="nextMonth"
            >
              <svg class="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- 月份网格 -->
          <div class="grid grid-cols-3 gap-2 px-4 py-4">
            <button
              v-for="(month, index) in months"
              :key="month"
              type="button"
              :class="[
                'px-4 py-3 text-sm font-medium rounded-lg transition-all',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                currentMonth.value === index
                  ? 'bg-primary text-white hover:bg-primaryHover shadow-md'
                  : 'text-text hover:bg-background hover:text-primary'
              ]"
              @click="selectMonth(index)"
              @keydown.enter="selectMonth(index)"
            >
              {{ month }}
            </button>
          </div>

          <!-- 底部操作按钮 -->
          <div class="flex items-center justify-end px-4 py-3 border-t border-border">
            <button
              type="button"
              class="px-4 py-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
              @click="viewMode = 'days'"
              @keydown.enter="viewMode = 'days'"
            >
              返回日视图
            </button>
          </div>
        </template>

        <!-- 年份选择视图 -->
        <template v-else-if="viewMode === 'years'">
          <!-- 年份选择头部 -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-border">
            <button
              type="button"
              class="p-1 hover:bg-background rounded transition-colors"
              @click="previousYearRange"
              @keydown.enter="previousYearRange"
            >
              <svg class="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span class="text-base font-semibold text-text">
              {{ yearRangeStart }} - {{ yearRangeStart + 11 }}
            </span>

            <button
              type="button"
              class="p-1 hover:bg-background rounded transition-colors"
              @click="nextYearRange"
              @keydown.enter="nextYearRange"
            >
              <svg class="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- 年份网格 -->
          <div class="grid grid-cols-3 gap-2 px-4 py-4">
            <button
              v-for="year in years"
              :key="year"
              type="button"
              :class="[
                'px-4 py-3 text-sm font-medium rounded-lg transition-all',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                currentYear.value === year
                  ? 'bg-primary text-white hover:bg-primaryHover shadow-md'
                  : 'text-text hover:bg-background hover:text-primary'
              ]"
              @click="selectYear(year)"
              @keydown.enter="selectYear(year)"
            >
              {{ year }}
            </button>
          </div>

          <!-- 底部操作按钮 -->
          <div class="flex items-center justify-between px-4 py-3 border-t border-border">
            <button
              type="button"
              class="px-3 py-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
              @click="selectToday"
              @keydown.enter="selectToday"
            >
              今天
            </button>
            <button
              type="button"
              class="px-4 py-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
              @click="backToMonths"
              @keydown.enter="backToMonths"
            >
              返回月份选择
            </button>
          </div>
        </template>
      </div>
    </Transition>

    <p v-if="error" class="mt-1 text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import type { DatePickerProps, DatePickerEmits } from './types'

const props = withDefaults(defineProps<DatePickerProps>(), {
  type: 'date',
  placeholder: '请选择日期',
  disabled: false,
  format: 'YYYY-MM-DD',
  showShortcuts: true,
  showClearButton: true
})

const emit = defineEmits<DatePickerEmits>()

const datePickerId = ref(`date-picker-${Math.random().toString(36).substr(2, 9)}`)
const isOpen = ref(false)
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const viewMode = ref<'days' | 'months' | 'years'>('days') // 视图模式
const yearRangeStart = ref(Math.floor(new Date().getFullYear() / 10) * 10 - 1) // 年份范围起始（十年为单位）

// 星期标题
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 快捷选项
const shortcuts = [
  { label: '今天', value: 0 },
  { label: '昨天', value: -1 },
  { label: '最近7天', value: -7 },
  { label: '最近30天', value: -30 }
]

// 计算当前显示的年月
const currentMonthYear = computed(() => {
  return `${currentYear.value}年 ${currentMonth.value + 1}月`
})

// 月份列表
const months = computed(() => {
  return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
})

// 年份列表（显示当前年份范围前后的年份）
const years = computed(() => {
  const years = []
  for (let i = 0; i < 12; i++) {
    years.push(yearRangeStart.value + i)
  }
  return years
})

// 显示值
const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder

  const date = props.modelValue instanceof Date ? props.modelValue : new Date(props.modelValue)
  return formatDate(date)
})

// 输入框样式
const inputClasses = computed(() => {
  const base = 'relative w-full cursor-default rounded-lg border border-border bg-surface py-2.5 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all duration-200'
  const errorClass = props.error ? 'border-danger focus:ring-danger' : ''
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  const openClass = isOpen.value ? 'ring-2 ring-primary border-transparent' : ''

  return [base, errorClass, disabledClass, openClass].filter(Boolean).join(' ')
})

// 格式化日期
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  if (props.format === 'YYYY/MM/DD') {
    return `${year}/${month}/${day}`
  }
  return `${year}-${month}-${day}`
}

// 解析日期
const parseDate = (value: string): Date | null => {
  const match = value.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/)
  if (match) {
    return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
  }
  return null
}

// 计算日历中的所有日期
const calendarDates = computed(() => {
  const dates = []
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0)
  const startDayOfWeek = firstDayOfMonth.getDay()
  const totalDays = lastDayOfMonth.getDate()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selectedDate = props.modelValue instanceof Date
    ? props.modelValue
    : (props.modelValue ? parseDate(props.modelValue) : null)

  const minDate = props.minDate ? (props.minDate instanceof Date ? props.minDate : parseDate(props.minDate)) : null
  const maxDate = props.maxDate ? (props.maxDate instanceof Date ? props.maxDate : parseDate(props.maxDate)) : null

  // 上个月的日期
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const date = new Date(currentYear.value, currentMonth.value - 1, day)
    dates.push({
      key: `prev-${day}`,
      day,
      date,
      currentMonth: false,
      isToday: false,
      selected: false,
      disabled: true
    })
  }

  // 当前月的日期
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(currentYear.value, currentMonth.value, day)
    date.setHours(0, 0, 0, 0)

    const isToday = date.getTime() === today.getTime()
    const selected = selectedDate ? date.getTime() === selectedDate.getTime() : false

    let disabled = false
    if (minDate && date < minDate) disabled = true
    if (maxDate && date > maxDate) disabled = true

    dates.push({
      key: `current-${day}`,
      day,
      date,
      currentMonth: true,
      isToday,
      selected,
      disabled
    })
  }

  // 下个月的日期
  const remainingCells = 42 - dates.length
  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, day)
    dates.push({
      key: `next-${day}`,
      day,
      date,
      currentMonth: false,
      isToday: false,
      selected: false,
      disabled: true
    })
  }

  return dates
})

// 日期样式
const dateClasses = (date: ReturnType<typeof calendarDates.value>[0]) => {
  const classes = [
    'relative h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200',
    'flex items-center justify-center',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
  ]

  if (!date.currentMonth) {
    classes.push('text-text-light opacity-30')
  } else if (date.disabled) {
    classes.push('text-text-light opacity-50 cursor-not-allowed')
  } else if (date.selected) {
    classes.push('bg-primary text-white hover:bg-primaryHover shadow-md')
  } else if (date.isToday) {
    classes.push('bg-primaryLight text-primary border-2 border-primary')
  } else {
    classes.push('text-text hover:bg-background hover:text-primary cursor-pointer')
  }

  return classes.join(' ')
}

// 方法
const togglePopover = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value

    if (isOpen.value && props.modelValue) {
      const date = props.modelValue instanceof Date ? props.modelValue : parseDate(props.modelValue)
      if (date) {
        currentMonth.value = date.getMonth()
        currentYear.value = date.getFullYear()
      }
    }
  }
}

const closePopover = () => {
  isOpen.value = false
}

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectDate = (date: ReturnType<typeof calendarDates.value>[0]) => {
  if (!date.disabled && date.currentMonth) {
    emit('update:modelValue', date.date)
    emit('change', date.date)
    closePopover()
  }
}

const selectToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const minDate = props.minDate ? (props.minDate instanceof Date ? props.minDate : parseDate(props.minDate)) : null
  const maxDate = props.maxDate ? (props.maxDate instanceof Date ? props.maxDate : parseDate(props.maxDate)) : null

  if ((!minDate || today >= minDate) && (!maxDate || today <= maxDate)) {
    emit('update:modelValue', today)
    emit('change', today)
    closePopover()
  }
}

const selectShortcut = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(0, 0, 0, 0)

  const minDate = props.minDate ? (props.minDate instanceof Date ? props.minDate : parseDate(props.minDate)) : null
  const maxDate = props.maxDate ? (props.maxDate instanceof Date ? props.maxDate : parseDate(props.maxDate)) : null

  if ((!minDate || date >= minDate) && (!maxDate || date <= maxDate)) {
    emit('update:modelValue', date)
    emit('change', date)
    closePopover()
  }
}

const clearValue = () => {
  emit('update:modelValue', undefined)
  emit('change', undefined)
  closePopover()
}

const toggleYearMonthView = () => {
  // 切换到月份选择视图
  viewMode.value = 'months'
}

const selectMonth = (month: number) => {
  currentMonth.value = month
  viewMode.value = 'days'
}

const selectYear = (year: number) => {
  currentYear.value = year
  viewMode.value = 'months'
}

const previousYearRange = () => {
  yearRangeStart.value -= 12
}

const nextYearRange = () => {
  yearRangeStart.value += 12
}

const backToMonths = () => {
  viewMode.value = 'months'
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    togglePopover()
  } else if (event.key === 'Escape' && isOpen.value) {
    closePopover()
  } else if (event.key === 'ArrowDown' && !isOpen.value) {
    event.preventDefault()
    isOpen.value = true
  }
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  const wrapper = document.querySelector(`#${datePickerId}`)?.closest('.date-picker-wrapper')

  if (wrapper && !wrapper.contains(target) && isOpen.value) {
    closePopover()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
