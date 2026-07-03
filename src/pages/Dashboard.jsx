import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { GlassNav } from '../components/common/GlassNav'
import { TaskForm } from '../components/tasks/TaskForm'
import { TaskCard } from '../components/tasks/TaskCard'
import { LoadingSkeleton } from '../components/tasks/LoadingSkeleton'

export const Dashboard = () => {
  const { tasks, loading, addTask, updateTask, archiveTask, deleteTask } = useTasks()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="dashboard-container">
      <GlassNav />

      <div className="dashboard-toolbar">
        <button onClick={() => setShowForm(!showForm)} className="btn-add">
          {showForm ? '✕ Cerrar' : '+ Nueva Tarea'}
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={async (data) => {
            await addTask(data)
            setShowForm(false)
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <LoadingSkeleton count={4} />
      ) : tasks.length === 0 ? (
        <p className="empty-text">No hay tareas activas. ¡Crea tu primera tarea!</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onArchive={archiveTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}
