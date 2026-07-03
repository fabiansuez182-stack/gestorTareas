import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../services/firebaseConfig'
import { useAuth } from '../context/AuthContext'

export const useArchivedTasks = () => {
  const [archivedTasks, setArchivedTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser) {
      setLoading(false)
      return
    }
    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`)
    const q = query(tasksRef, where('archived', '==', true))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setArchivedTasks(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [currentUser])

  const restoreTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId)
    await updateDoc(taskRef, { archived: false, updatedAt: new Date() })
  }

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId)
    await deleteDoc(taskRef)
  }

  return { archivedTasks, loading, restoreTask, deleteTask }
}
