export const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="task-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="task-card glass-container skeleton-pulse">
          <div className="task-header">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-time" />
          </div>
        </div>
      ))}
    </div>
  )
}
