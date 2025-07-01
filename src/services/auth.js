import { auth } from '@/firebase'
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth'

export const sanitizeUser = (user) => {
  if (!user) return null
  const { uid, email, displayName, photoURL } = user
  return { uid, email, displayName, photoURL }
}

export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return sanitizeUser(userCredential.user)
  } catch (error) {
    throw new Error('Invalid email or password')
  }
}

export const signup = async ({ email, password, displayName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    return sanitizeUser(userCredential.user)
  } catch (error) {
    throw new Error('Failed to create an account. Please try again.')
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    throw new Error('Failed to log out. Please try again.')
  }
}

export const fetchUserData = () => 
  new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => resolve(sanitizeUser(user)),
      (error) => {
        console.error(`Error fetching user data: ${error.message}`)
        reject(new Error('Failed to fetch user data. Please try again.'))
      }
    )
  })
