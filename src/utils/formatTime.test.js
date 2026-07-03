import { describe, it, expect } from 'vitest'
import { formatTime, formatDate } from './formatTime'

describe('formatTime', () => {
  it('formatea 0 segundos como "0s"', () => {
    expect(formatTime(0)).toBe('0s')
  })

  it('formatea segundos sin minutos ni horas', () => {
    expect(formatTime(45)).toBe('45s')
  })

  it('formatea minutos y segundos', () => {
    expect(formatTime(125)).toBe('2m 5s')
  })

  it('formatea horas, minutos y segundos', () => {
    expect(formatTime(3661)).toBe('1h 1m 1s')
  })

  it('formatea solo horas exactas', () => {
    expect(formatTime(7200)).toBe('2h 0m 0s')
  })

  it('maneja valores negativos como 0', () => {
    expect(formatTime(-5)).toBe('0s')
  })

  it('maneja valores decimales truncando', () => {
    expect(formatTime(90.7)).toBe('1m 30s')
  })
})

describe('formatDate', () => {
  it('formatea un objeto Date con segundos', () => {
    const date = new Date('2026-06-18T15:30:00')
    const result = formatDate(date)
    expect(result).toContain('2026')
    expect(result).toContain('6')
  })

  it('formatea un Timestamp de Firestore (con toDate)', () => {
    const timestamp = { toDate: () => new Date('2026-06-18') }
    const result = formatDate(timestamp)
    expect(result).toContain('2026')
  })

  it('retorna string vacío para null/undefined', () => {
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
  })
})
