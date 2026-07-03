import Swal from 'sweetalert2'
import { useArchivedTasks } from '../hooks/useArchivedTasks'
import { GlassNav } from '../components/common/GlassNav'
import { LoadingSkeleton } from '../components/tasks/LoadingSkeleton'
import { formatTime, formatDate } from '../utils/formatTime'

export const ArchivedPage = () => {
  const { archivedTasks, loading, restoreTask, deleteTask } = useArchivedTasks()

  const handleRestore = async (id) => {
    await restoreTask(id)
    Swal.fire({ icon: 'success', title: 'Tarea restaurada', timer: 1000, showConfirmButton: false })
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar permanentemente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      await deleteTask(id)
      Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1000, showConfirmButton: false })
    }
  }

  return (
    <div className="dashboard-container">
      <GlassNav />

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : archivedTasks.length === 0 ? (
        <p className="empty-text">No hay tareas archivadas.</p>
      ) : (
        <div className="task-list">
          {archivedTasks.map(task => (
            <div key={task.id} className="task-card glass-container archived">
              <div className="task-header">
                <h3>{task.title}</h3>
              </div>
              <div className="task-details">
                {task.description && <p className="task-desc">{task.description}</p>}
                <p><strong>Tiempo invertido:</strong> {formatTime(task.timeSpent || 0)}</p>
                <p><strong>Creada:</strong> {formatDate(task.createdAt)}</p>
              </div>
              <div className="task-actions" style={{ padding: '0 20px 20px' }}>
                <button onClick={() => handleRestore(task.id)} className="btn-primary" style={{ width: 'auto' }}>
                  Restaurar
                </button>
                <button onClick={() => handleDelete(task.id)} className="btn-delete">
                  Eliminar Definitivamente
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
