import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimer } from './useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('inicia con elapsed 0 y no corriendo', () => {
    const { result } = renderHook(() => useTimer())
    expect(result.current.elapsed).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })

  it('inicia con un valor inicial', () => {
    const { result } = renderHook(() => useTimer(10))
    expect(result.current.elapsed).toBe(10)
  })

  it('start() pone isRunning en true', () => {
    const { result } = renderHook(() => useTimer())
    act(() => result.current.start())
    expect(result.current.isRunning).toBe(true)
  })

  it('pause() pone isRunning en false', () => {
    const { result } = renderHook(() => useTimer())
    act(() => result.current.start())
    act(() => result.current.pause())
    expect(result.current.isRunning).toBe(false)
  })

  it('reset() pone elapsed a 0 y detiene', () => {
    const { result } = renderHook(() => useTimer())
    act(() => result.current.reset())
    expect(result.current.elapsed).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })

  it('saveTime() llama a onTimeUpdate con elapsed y retorna el valor', () => {
    const onTimeUpdate = vi.fn()
    const { result } = renderHook(() => useTimer(0, onTimeUpdate))

    act(() => {
      const saved = result.current.saveTime()
      expect(typeof saved).toBe('number')
    })

    expect(onTimeUpdate).toHaveBeenCalled()
  })

  it('saveTime() returns elapsed', () => {
    const { result } = renderHook(() => useTimer(5))
    let saved
    act(() => {
      saved = result.current.saveTime()
    })
    expect(saved).toBe(5)
  })
})
