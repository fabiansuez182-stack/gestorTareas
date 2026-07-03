import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskForm } from './TaskForm'

describe('TaskForm', () => {
  it('renderiza los campos del formulario', () => {
    render(<TaskForm onSubmit={vi.fn()} onCancel={vi.fn()} />)
    expect(screen.getByPlaceholderText('Nombre de la tarea *')).toBeDefined()
    expect(screen.getByPlaceholderText('Descripción (opcional)')).toBeDefined()
    expect(screen.getByPlaceholderText('Tiempo estimado (minutos)')).toBeDefined()
  })

  it('llama a onSubmit con los datos del formulario', () => {
    const onSubmit = vi.fn()
    render(<TaskForm onSubmit={onSubmit} onCancel={vi.fn()} />)

    fireEvent.change(screen.getByPlaceholderText('Nombre de la tarea *'), {
      target: { value: 'Nueva tarea de prueba' }
    })
    fireEvent.change(screen.getByPlaceholderText('Descripción (opcional)'), {
      target: { value: 'Descripción de prueba' }
    })

    fireEvent.click(screen.getByText('Crear Tarea'))

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Nueva tarea de prueba',
      description: 'Descripción de prueba',
      status: 'pending',
      estimatedTime: 0
    })
  })

  it('no llama a onSubmit si el nombre está vacío', () => {
    const onSubmit = vi.fn()
    render(<TaskForm onSubmit={onSubmit} onCancel={vi.fn()} />)

    fireEvent.click(screen.getByText('Crear Tarea'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('llama a onCancel al hacer clic en Cancelar', () => {
    const onCancel = vi.fn()
    render(<TaskForm onSubmit={vi.fn()} onCancel={onCancel} />)

    fireEvent.click(screen.getByText('Cancelar'))

    expect(onCancel).toHaveBeenCalled()
  })
})
