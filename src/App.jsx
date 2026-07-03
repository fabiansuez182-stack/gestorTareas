import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Dashboard } from './pages/Dashboard'
import { ArchivedPage } from './pages/ArchivedPage'
import { ReportsPage } from './pages/ReportsPage'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser ? <Navigate to="/dashboard" /> : children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/archived" element={<ProtectedRoute><ArchivedPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
