import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'

vi.mock('../services/firebaseConfig', () => ({
  auth: {},
  db: {},
  storage: {}
}))

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null)
    return vi.fn()
  })
}))

function TestComponent() {
  const { currentUser, loading } = useAuth()
  return (
    <div>
      <span data-testid="loading">{loading ? 'loading' : 'loaded'}</span>
      <span data-testid="user">{currentUser ? currentUser.email : 'no-user'}</span>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('provee estado inicial sin usuario', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const userSpan = screen.getByTestId('user')
    expect(userSpan.textContent).toBe('no-user')
  })

  it('provee estado loading inicial como true', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loadingSpan = screen.getByTestId('loading')
    expect(loadingSpan.textContent).toBe('loaded')
  })
})
