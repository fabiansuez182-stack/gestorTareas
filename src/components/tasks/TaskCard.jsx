import { useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { formatTime } from '../../utils/formatTime'
import { TaskTimer } from './TaskTimer'
import { TaskAttachments } from './TaskAttachments'
import { TaskComments } from './TaskComments'
import { TaskActions } from './TaskActions'

export const TaskCard = ({ task, onUpdate, onArchive, onDelete }) => {
  const { currentUser } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description || '')
  const [editEstimated, setEditEstimated] = useState(task.estimatedTime || '')

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      Swal.fire({ icon: 'warning', title: 'El nombre no puede estar vacío' })
      return
    }
    await onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      estimatedTime: Number(editEstimated) || 0
    })
    setEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDesc(task.description || '')
    setEditEstimated(task.estimatedTime || '')
    setEditing(false)
  }

  const handleDelete = () => {
    Swal.fire({
      title: '¿Eliminar tarea?',
      text: `"${task.title}" se eliminará permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(task.id)
        Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1000, showConfirmButton: false })
      }
    })
  }

  const handleArchive = () => {
    onArchive(task.id)
    Swal.fire({ icon: 'info', title: 'Tarea archivada', timer: 1000, showConfirmButton: false })
  }

  const toggleStatus = () => {
    const nextStatus = task.status === 'pending' ? 'in-progress'
      : task.status === 'in-progress' ? 'completed'
      : 'pending'
    onUpdate(task.id, { status: nextStatus })
  }

  if (editing) {
    return (
      <div className="task-card glass-container">
        <div className="task-details" style={{ padding: '20px' }}>
          <div className="form-group">
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Nombre de la tarea" />
          </div>
          <div className="form-group">
            <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Descripción" />
          </div>
          <div className="form-group">
            <input type="number" value={editEstimated} onChange={(e) => setEditEstimated(e.target.value)} placeholder="Tiempo estimado (min)" />
          </div>
          <div className="form-actions">
            <button onClick={handleSaveEdit} className="btn-primary">Guardar</button>
            <button onClick={handleCancelEdit} className="btn-cancel">Cancelar</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-card glass-container ${task.archived ? 'archived' : ''}`}>
      <div className="task-header" onClick={() => setExpanded(!expanded)}>
        <div className="task-title-section">
          <span className={`task-status ${task.status}`} onClick={(e) => { e.stopPropagation(); toggleStatus() }} />
          <h3>{task.title}</h3>
        </div>
        <div className="task-meta">
          <span className="task-time">{formatTime(task.timeSpent || 0)}</span>
          <span className="accordion-icon">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div className="task-details">
          {task.description && <p className="task-desc">{task.description}</p>}
          {task.estimatedTime > 0 && (
            <p className="task-estimated">Tiempo estimado: {task.estimatedTime} min</p>
          )}

          <TaskTimer
            taskId={task.id}
            initialTime={task.timeSpent || 0}
            onTimeSave={onUpdate}
            onExpand={() => setExpanded(true)}
          />

          <TaskAttachments
            taskId={task.id}
            attachmentUrls={task.attachmentUrls}
            onUpdate={onUpdate}
          />

          <TaskComments
            taskId={task.id}
            comments={task.comments}
            onUpdate={onUpdate}
            userEmail={currentUser?.email}
          />

          <TaskActions
            onEdit={() => setEditing(true)}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  )
}
