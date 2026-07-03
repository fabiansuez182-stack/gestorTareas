import { useState } from 'react'
import Swal from 'sweetalert2'
import { uploadFile } from '../../services/cloudinaryService'

export const TaskAttachments = ({ taskId, attachmentUrls = [], onUpdate }) => {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadFile(file)
      const urls = attachmentUrls || []
      await onUpdate(taskId, { attachmentUrls: [...urls, url] })
      Swal.fire({ icon: 'success', title: 'Archivo subido', timer: 1000, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error al subir archivo', text: error.message })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteAttachment = async (index) => {
    const result = await Swal.fire({
      title: '¿Eliminar este archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      const urls = attachmentUrls.filter((_, i) => i !== index)
      await onUpdate(taskId, { attachmentUrls: urls })
    }
  }

  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)

  return (
    <div className="task-attachments">
      <label className={`btn-upload ${uploading ? 'uploading' : ''}`}>
        {uploading ? '⏳ Subiendo...' : '📎 Adjuntar archivo'}
        <input
          type="file"
          hidden
          disabled={uploading}
          onChange={(e) => handleFileUpload(e.target.files[0])}
          accept="image/*,.pdf"
        />
      </label>
      {uploading && <div className="upload-progress"><div className="upload-progress-bar" /></div>}
      {attachmentUrls.length > 0 && (
        <div className="attachment-list">
          {attachmentUrls.map((url, i) => (
            <div key={i} className="attachment-item">
              {isImage(url) ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img src={url} alt={`Adjunto ${i + 1}`} className="attachment-thumb" />
                </a>
              ) : (
                <a href={url} target="_blank" rel="noopener noreferrer" className="attachment-link">
                  📄 Archivo {i + 1}
                </a>
              )}
              <button
                className="btn-attachment-delete"
                onClick={() => handleDeleteAttachment(i)}
                title="Eliminar adjunto"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
