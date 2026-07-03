import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../services/firebaseConfig'
import { useAuth } from '../context/AuthContext'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser) {
      setLoading(false)
      return
    }

    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`)
    const q = query(tasksRef, where('archived', '==', false))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTasks(tasksData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [currentUser])

  const addTask = async (task) => {
    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`)
    await addDoc(tasksRef, {
      ...task,
      archived: false,
      timeSpent: 0,
      comments: [],
      attachmentUrls: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId)
    await updateDoc(taskRef, { ...updatedData, updatedAt: new Date() })
  }

  const archiveTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId)
    await updateDoc(taskRef, { archived: true, updatedAt: new Date() })
  }

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId)
    await deleteDoc(taskRef)
  }

  return { tasks, loading, addTask, updateTask, archiveTask, deleteTask }
}
