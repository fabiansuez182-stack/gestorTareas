import { GlassNav } from '../components/common/GlassNav'
import { ReportExport } from '../components/tasks/ReportExport'

export const ReportsPage = () => {
  return (
    <div className="dashboard-container">
      <GlassNav />
      <ReportExport />
    </div>
  )
}
