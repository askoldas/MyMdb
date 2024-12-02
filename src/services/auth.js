import { auth } from '@/firebase'
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'

// Login
export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const { uid, email: userEmail, displayName } = userCredential.user
    return { uid, email: userEmail, displayName }
  } catch (error) {
    console.error('Error logging in:', error.message)
    throw new Error('Invalid email or password')
  }
}

// Signup
export const signup = async ({ email, password, displayName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    const { uid, email: userEmail } = userCredential.user
    return { uid, email: userEmail, displayName }
  } catch (error) {
    console.error('Error signing up:', error.message)
    throw new Error('Failed to create an account. Please try again.')
  }
}

// Logout
export const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.error('Error logging out:', error.message)
    throw new Error('Failed to log out. Please try again.')
  }
}

// Fetch User Data (e.g., for persistent sessions)
export const fetchUserData = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const { uid, email, displayName } = user
          resolve({ uid, email, displayName })
        } else {
          resolve(null) // No user logged in
        }
      },
      (error) => {
        console.error('Error fetching user data:', error.message)
        reject(new Error('Failed to fetch user data. Please try again.'))
      }
    )
  })
}
