import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from './firebaseConfig'

const googleProvider = new GoogleAuthProvider()

export const registerWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  return result.user
}

export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider)
  return result.user
}

export const logout = async () => {
  await signOut(auth)
}

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}
