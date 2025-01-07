// 导入React的useCallback和useRef hooks
import { useCallback, useRef } from 'react'

// 定义防抖函数hook
// T extends (...args: Parameters<T>) => ReturnType<T> 表示:
// - T是一个泛型函数类型
// - Parameters<T>获取函数T的参数类型元组
// - ReturnType<T>获取函数T的返回值类型
export const useDebounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T, // fn参数的类型是T
  delay: number = 500 // delay参数默认值为500ms
) => {
  // 使用useRef存储定时器ID
  // NodeJS.Timeout | null 表示可以是定时器ID或null
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 返回一个useCallback包装的函数,依赖项是[fn, delay]
  // ...args: Parameters<T>表示展开fn函数的参数类型
  return useCallback((...args: Parameters<T>) => {
    // 如果存在之前的定时器,则清除
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // 设置新的定时器,delay毫秒后执行fn
    timeoutRef.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay])
}

