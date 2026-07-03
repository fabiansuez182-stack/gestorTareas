import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginWithEmail, loginWithGoogle, resetPassword } from '../services/authService'
import { validateEmail } from '../utils/validations'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor ingresa un correo electrónico válido'
      })
      return
    }

    setLoading(true)
    try {
      await loginWithEmail(email, password)
      navigate('/dashboard')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      navigate('/dashboard')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error con Google',
        text: error.message
      })
    }
  }

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo requerido',
        text: 'Ingresa tu correo primero para recuperar la contraseña'
      })
      return
    }

    try {
      await resetPassword(email)
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Revisa tu bandeja de entrada para restablecer tu contraseña'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass-container">
        <h1>Gestor de Tareas</h1>
        <p className="auth-subtitle">Inicia sesión para continuar</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-divider">
          <span>o</span>
        </div>

        <button onClick={handleGoogleLogin} className="btn-google">
          Continuar con Google
        </button>

        <div className="auth-links">
          <button onClick={handleResetPassword} className="btn-link">
            ¿Olvidaste tu contraseña?
          </button>
          <Link to="/register" className="btn-link">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}
