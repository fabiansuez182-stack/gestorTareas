import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, validateTaskName } from './validations'

describe('validateEmail', () => {
  it('acepta emails válidos', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user.name+tag@gmail.co')).toBe(true)
    expect(validateEmail('a@b.co')).toBe(true)
  })

  it('rechaza emails sin @', () => {
    expect(validateEmail('testexample.com')).toBe(false)
  })

  it('rechaza emails sin dominio', () => {
    expect(validateEmail('test@')).toBe(false)
  })

  it('rechaza emails con espacios', () => {
    expect(validateEmail('test @example.com')).toBe(false)
  })

  it('rechaza string vacío', () => {
    expect(validateEmail('')).toBe(false)
  })
})

describe('validatePassword', () => {
  it('acepta contraseñas con 8+ chars, mayúscula y número', () => {
    expect(validatePassword('Password1')).toBe(true)
    expect(validatePassword('Abcdefg1')).toBe(true)
    expect(validatePassword('MyPass123')).toBe(true)
  })

  it('rechaza contraseñas sin mayúscula', () => {
    expect(validatePassword('password1')).toBe(false)
  })

  it('rechaza contraseñas sin número', () => {
    expect(validatePassword('Password')).toBe(false)
  })

  it('rechaza contraseñas menores a 8 caracteres', () => {
    expect(validatePassword('Pa1')).toBe(false)
  })

  it('rechaza string vacío', () => {
    expect(validatePassword('')).toBe(false)
  })
})

describe('validateTaskName', () => {
  it('acepta nombres no vacíos', () => {
    expect(validateTaskName('Mi tarea')).toBe(true)
  })

  it('rechaza nombres vacíos', () => {
    expect(validateTaskName('')).toBe(false)
  })

  it('rechaza nombres solo con espacios', () => {
    expect(validateTaskName('   ')).toBe(false)
  })
})
