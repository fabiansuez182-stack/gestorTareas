import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { TaskCard } from './TaskCard'

const mockTask = {
  id: '123',
  title: 'Test Task',
  description: 'A test description',
  status: 'pending',
  timeSpent: 120,
  estimatedTime: 30,
  comments: [],
  attachmentUrls: [],
  archived: false
}

const renderWithProviders = (ui, { currentUser = { email: 'test@test.com' } } = {}) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser, loading: false }}>
        {ui}
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

describe('TaskCard', () => {
  it('renderiza el título de la tarea', () => {
    renderWithProviders(
      <TaskCard task={mockTask} onUpdate={vi.fn()} onArchive={vi.fn()} onDelete={vi.fn()} />
    )
    expect(screen.getByText('Test Task')).toBeDefined()
  })

  it('renderiza el tiempo formateado', () => {
    renderWithProviders(
      <TaskCard task={mockTask} onUpdate={vi.fn()} onArchive={vi.fn()} onDelete={vi.fn()} />
    )
    expect(screen.getByText('2m 0s')).toBeDefined()
  })

  it('expande detalles al hacer clic en el header', () => {
    renderWithProviders(
      <TaskCard task={mockTask} onUpdate={vi.fn()} onArchive={vi.fn()} onDelete={vi.fn()} />
    )
    const header = screen.getByText('Test Task').closest('.task-header')
    fireEvent.click(header)
    expect(screen.getByText('A test description')).toBeDefined()
    expect(screen.getByText('Tiempo estimado: 30 min')).toBeDefined()
  })

  it('muestra el temporizador al expandir', () => {
    renderWithProviders(
      <TaskCard task={mockTask} onUpdate={vi.fn()} onArchive={vi.fn()} onDelete={vi.fn()} />
    )
    const header = screen.getByText('Test Task').closest('.task-header')
    fireEvent.click(header)
    expect(screen.getByText('▶ Iniciar')).toBeDefined()
  })

  it('muestra botones de acción al expandir', () => {
    renderWithProviders(
      <TaskCard task={mockTask} onUpdate={vi.fn()} onArchive={vi.fn()} onDelete={vi.fn()} />
    )
    const header = screen.getByText('Test Task').closest('.task-header')
    fireEvent.click(header)
    expect(screen.getByText('✏ Editar')).toBeDefined()
    expect(screen.getByText('Archivar')).toBeDefined()
    expect(screen.getByText('Eliminar')).toBeDefined()
  })
})
