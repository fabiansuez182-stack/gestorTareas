import { CSVLink } from 'react-csv'
import { useTasks } from '../../hooks/useTasks'
import { formatTime } from '../../utils/formatTime'
import Swal from 'sweetalert2'

export const ReportExport = () => {
  const { tasks } = useTasks()

  const totalTasks = tasks.length
  const totalTime = tasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0)
  const completedTasks = tasks.filter(t => t.status === 'completed').length

  const reportData = tasks.map(task => ({
    'ID': task.id,
    'Nombre': task.title,
    'Descripción': task.description || '',
    'Estado': task.status,
    'Tiempo Invertido (segundos)': task.timeSpent || 0,
    'Tiempo Formateado': formatTime(task.timeSpent || 0),
    'Tiempo Estimado (min)': task.estimatedTime || 0,
    'Fecha Creación': task.createdAt?.toDate?.()?.toLocaleDateString('es-CO') || '',
    'Comentarios': task.comments?.length || 0,
    'Archivos Adjuntos': task.attachmentUrls?.length || 0
  }))

  const handleExportPDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf')

      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()

      doc.setFontSize(18)
      doc.text('Reporte de Productividad', pageWidth / 2, 20, { align: 'center' })

      doc.setFontSize(10)
      doc.text(`Generado: ${new Date().toLocaleDateString('es-CO')}`, pageWidth / 2, 28, { align: 'center' })

      doc.setFontSize(12)
      doc.text(`Total tareas: ${totalTasks}`, 14, 40)
      doc.text(`Completadas: ${completedTasks}`, 14, 48)
      doc.text(`Tiempo total: ${formatTime(totalTime)}`, 14, 56)

      doc.setFontSize(8)
      let y = 70
      doc.text('Nombre', 14, y)
      doc.text('Estado', 90, y)
      doc.text('Tiempo', 140, y)
      doc.text('Creada', 170, y)
      y += 6

      tasks.forEach((task) => {
        if (y > 275) {
          doc.addPage()
          y = 20
        }
        doc.text((task.title || '').substring(0, 25), 14, y)
        doc.text(task.status || '', 90, y)
        doc.text(formatTime(task.timeSpent || 0), 140, y)
        doc.text(task.createdAt?.toDate?.()?.toLocaleDateString('es-CO') || '', 170, y)
        y += 5
      })

      doc.save(`reporte-tareas-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error al generar PDF', text: error.message })
    }
  }

  const handleExportExcel = async () => {
    try {
      const XLSX = await import('xlsx')

      const excelData = tasks.map((task, i) => ({
        '#': i + 1,
        'Nombre': task.title,
        'Descripción': task.description || '',
        'Estado': task.status === 'pending' ? 'Pendiente' : task.status === 'in-progress' ? 'En Progreso' : 'Completada',
        'Tiempo': formatTime(task.timeSpent || 0),
        'Estimado (min)': task.estimatedTime || 0,
        'Creada': task.createdAt?.toDate?.()?.toLocaleDateString('es-CO') || ''
      }))

      const ws = XLSX.utils.json_to_sheet(excelData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Tareas')

      ws['!cols'] = [
        { wch: 4 }, { wch: 30 }, { wch: 25 }, { wch: 15 },
        { wch: 12 }, { wch: 14 }, { wch: 14 }
      ]

      XLSX.writeFile(wb, `reporte-tareas-${new Date().toISOString().split('T')[0]}.xlsx`)
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error al generar Excel', text: error.message })
    }
  }

  return (
    <div className="glass-container reports-summary">
      <h3>Resumen de Productividad</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Total Tareas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{completedTasks}</span>
          <span className="stat-label">Completadas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatTime(totalTime)}</span>
          <span className="stat-label">Tiempo Total</span>
        </div>
      </div>

      {tasks.length > 0 ? (
        <div className="export-actions">
          <CSVLink
            data={reportData}
            filename={`reporte-tareas-${new Date().toISOString().split('T')[0]}.csv`}
            className="btn-export"
          >
            📄 Descargar CSV
          </CSVLink>
          <button onClick={handleExportExcel} className="btn-export">
            📊 Descargar Excel
          </button>
          <button onClick={handleExportPDF} className="btn-export">
            📕 Descargar PDF
          </button>
        </div>
      ) : (
        <p className="empty-text">No hay tareas para exportar.</p>
      )}
    </div>
  )
}
