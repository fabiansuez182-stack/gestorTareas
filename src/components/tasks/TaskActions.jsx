export const TaskActions = ({ onEdit, onArchive, onDelete }) => {
  return (
    <div className="task-actions">
      <button onClick={onEdit} className="btn-edit">✏ Editar</button>
      <button onClick={onArchive} className="btn-archive">Archivar</button>
      <button onClick={onDelete} className="btn-delete">Eliminar</button>
    </div>
  )
}
