import { useState } from 'react'

export const TaskComments = ({ taskId, comments = [], onUpdate, userEmail }) => {
  const [text, setText] = useState('')

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const trimmed = text.trim()
      if (!trimmed) return
      const currentComments = comments || []
      await onUpdate(taskId, {
        comments: [...currentComments, { text: trimmed, date: new Date(), user: userEmail }]
      })
      setText('')
    }
  }

  return (
    <div className="task-comments">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Agregar comentario (Enter para enviar)..."
      />
      {comments.length > 0 && (
        <div className="comments-list">
          {comments.map((c, i) => (
            <div key={i} className="comment-item">
              <strong>{c.user}</strong>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
