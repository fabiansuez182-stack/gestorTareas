import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'

export const GlassNav = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const links = [
    { path: '/dashboard', label: 'Mis Tareas' },
    { path: '/archived', label: 'Archivadas' },
    { path: '/reports', label: 'Reportes' }
  ]

  return (
    <header className="glass-nav glass-container">
      <div className="nav-brand" onClick={() => navigate('/dashboard')}>
        <h1>Gestor de Tareas</h1>
      </div>
      <nav className="nav-links">
        {links.map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </button>
        ))}
      </nav>
      <div className="nav-user">
        <span className="user-email">{currentUser?.email}</span>
        <button onClick={handleLogout} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}
