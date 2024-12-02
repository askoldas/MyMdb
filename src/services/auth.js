import { auth } from '@/firebase'
import { firebaseEndpoints } from '@/config/FirebaseApi'
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'

export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const { uid, email: userEmail, displayName } = userCredential.user
    return { uid, email: userEmail, displayName }
  } catch (error) {
    console.error(`Error logging in (${firebaseEndpoints.auth.login}):`, error.message)
    throw new Error('Invalid email or password')
  }
}

export const signup = async ({ email, password, displayName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    const { uid, email: userEmail } = userCredential.user
    return { uid, email: userEmail, displayName }
  } catch (error) {
    console.error(`Error signing up (${firebaseEndpoints.auth.signUp}):`, error.message)
    throw new Error('Failed to create an account. Please try again.')
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.error(`Error logging out (${firebaseEndpoints.auth.logout}):`, error.message)
    throw new Error('Failed to log out. Please try again.')
  }
}

export const fetchUserData = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const { uid, email, displayName } = user
          resolve({ uid, email, displayName })
        } else {
          resolve(null)
        }
      },
      (error) => {
        console.error(`Error fetching user data (${firebaseEndpoints.users.collection}):`, error.message)
        reject(new Error('Failed to fetch user data. Please try again.'))
      }
    )
  })
}
