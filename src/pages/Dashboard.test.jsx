import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Dashboard } from './Dashboard'

vi.mock('../hooks/useTasks', () => ({
  useTasks: () => ({
    tasks: [
      { id: '1', title: 'Task 1', status: 'pending', timeSpent: 0, comments: [], attachmentUrls: [], archived: false },
      { id: '2', title: 'Task 2', status: 'completed', timeSpent: 300, comments: [], attachmentUrls: [], archived: false }
    ],
    loading: false,
    addTask: vi.fn(),
    updateTask: vi.fn(),
    archiveTask: vi.fn(),
    deleteTask: vi.fn()
  })
}))

vi.mock('../components/common/GlassNav', () => ({
  GlassNav: () => <nav data-testid="glass-nav">Nav</nav>
}))

vi.mock('../components/tasks/TaskForm', () => ({
  TaskForm: ({ onSubmit, onCancel }) => (
    <div data-testid="task-form">
      <button onClick={() => onSubmit({ title: 'Test', description: '', estimatedTime: 0 })}>Mock Submit</button>
      <button onClick={onCancel}>Mock Cancel</button>
    </div>
  )
}))

vi.mock('../components/tasks/TaskCard', () => ({
  TaskCard: ({ task }) => <div data-testid="task-card">{task.title}</div>
}))

vi.mock('../components/tasks/LoadingSkeleton', () => ({
  LoadingSkeleton: ({ count }) => <div data-testid="loading-skeleton">{count} skeletons</div>
}))

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser: { email: 'test@test.com' }, loading: false }}>
        <Dashboard />
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

describe('Dashboard', () => {
  it('renderiza la navegación', () => {
    renderDashboard()
    expect(screen.getByTestId('glass-nav')).toBeDefined()
  })

  it('renderiza las tareas desde useTasks', () => {
    renderDashboard()
    expect(screen.getByText('Task 1')).toBeDefined()
    expect(screen.getByText('Task 2')).toBeDefined()
  })

  it('muestra el botón de nueva tarea', () => {
    renderDashboard()
    expect(screen.getByText('+ Nueva Tarea')).toBeDefined()
  })

  it('abre el formulario al hacer clic en nueva tarea', () => {
    renderDashboard()
    fireEvent.click(screen.getByText('+ Nueva Tarea'))
    expect(screen.getByTestId('task-form')).toBeDefined()
  })
})
