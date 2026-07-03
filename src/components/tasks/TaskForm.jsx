import { useState } from 'react'
import Swal from 'sweetalert2'

const emptyTask = { title: '', description: '', estimatedTime: '' }

export const TaskForm = ({ onSubmit, initialTask, onCancel }) => {
  const [task, setTask] = useState(initialTask || { ...emptyTask })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!task.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre requerido',
        text: 'El nombre de la tarea es obligatorio'
      })
      return
    }

    await onSubmit({
      title: task.title.trim(),
      description: task.description.trim(),
      estimatedTime: Number(task.estimatedTime) || 0,
      status: initialTask?.status || 'pending'
    })

    if (!initialTask) {
      setTask({ ...emptyTask })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form glass-container">
      <h3>{initialTask ? 'Editar Tarea' : 'Nueva Tarea'}</h3>

      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre de la tarea *"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Descripción (opcional)"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          placeholder="Tiempo estimado (minutos)"
          value={task.estimatedTime}
          onChange={(e) => setTask({ ...task, estimatedTime: e.target.value })}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialTask ? 'Guardar Cambios' : 'Crear Tarea'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
      </div>
    </form>
  )
}
