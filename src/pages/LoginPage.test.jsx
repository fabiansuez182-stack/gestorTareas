import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LoginPage } from './LoginPage'

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser: null, loading: false }}>
        {ui}
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

describe('LoginPage', () => {
  it('renderiza el formulario de login', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByLabelText('Correo electrónico')).toBeDefined()
    expect(screen.getByLabelText('Contraseña')).toBeDefined()
  })

  it('muestra botón de inicio de sesión', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText('Iniciar Sesión')).toBeDefined()
  })

  it('muestra botón de Google', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText('Continuar con Google')).toBeDefined()
  })

  it('muestra enlace de registro', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText('¿No tienes cuenta? Regístrate')).toBeDefined()
  })

  it('muestra botón de recuperación de contraseña', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeDefined()
  })
})
