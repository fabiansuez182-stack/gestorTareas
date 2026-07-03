import { useTimer } from '../../hooks/useTimer'
import { formatTime } from '../../utils/formatTime'

export const TaskTimer = ({ taskId, initialTime, onTimeSave, onExpand }) => {
  const timer = useTimer(0, async (seconds) => {
    await onTimeSave(taskId, {
      timeSpent: (initialTime || 0) + seconds
    })
  })

  const handleStart = () => {
    timer.start()
    onExpand()
  }

  return (
    <div className="task-timer">
      <span className="timer-display">{formatTime(timer.elapsed)}</span>
      {!timer.isRunning ? (
        <button onClick={handleStart} className="btn-timer">▶ Iniciar</button>
      ) : (
        <button onClick={timer.saveTime} className="btn-timer pause">⏸ Pausar</button>
      )}
    </div>
  )
}
