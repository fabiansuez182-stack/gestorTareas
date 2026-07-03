import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { registerWithEmail, loginWithGoogle } from '../services/authService'
import { validateEmail, validatePassword } from '../utils/validations'

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor ingresa un correo electrónico válido'
      })
      return
    }

    if (!validatePassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 número'
      })
      return
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas ingresadas no son iguales'
      })
      return
    }

    setLoading(true)
    try {
      await registerWithEmail(email, password)
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Bienvenido a Gestor de Tareas'
      })
      navigate('/dashboard')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
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

  return (
    <div className="auth-container">
      <div className="auth-card glass-container">
        <h1>Crear Cuenta</h1>
        <p className="auth-subtitle">Regístrate para gestionar tus tareas</p>

        <form onSubmit={handleRegister}>
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
              placeholder="Mín. 8 carácteres, 1 mayúscula, 1 número"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="auth-divider">
          <span>o</span>
        </div>

        <button onClick={handleGoogleRegister} className="btn-google">
          Registrarse con Google
        </button>

        <div className="auth-links">
          <Link to="/login" className="btn-link">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
