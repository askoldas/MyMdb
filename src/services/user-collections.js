import { db } from '@/firebase'
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore'

export const addMovieToUserCollection = async (uid, collectionName, movie) => {
  try {
    const docRef = doc(db, `users/${uid}/${collectionName}`, movie.id.toString())
    await setDoc(docRef, movie)
    return movie
  } catch (error) {
    console.error(`Error adding to Firestore ${collectionName}:`, error.message)
    throw new Error('Failed to add movie to collection. Please try again later.')
  }
}

export const removeMovieFromUserCollection = async (uid, collectionName, movieId) => {
  try {
    const docRef = doc(db, `users/${uid}/${collectionName}`, movieId.toString())
    await deleteDoc(docRef)
    return movieId
  } catch (error) {
    console.error(`Error removing from Firestore ${collectionName}:`, error.message)
    throw new Error('Failed to remove movie from collection. Please try again later.')
  }
}

export const fetchUserCollectionMovies = async (uid, collectionName) => {
  try {
    const collectionRef = collection(db, `users/${uid}/${collectionName}`)
    const snapshot = await getDocs(collectionRef)
    return snapshot.docs.map((doc) => doc.data())
  } catch (error) {
    console.error(`Error fetching Firestore ${collectionName}:`, error.message)
    throw new Error('Failed to fetch movies from collection. Please try again later.')
  }
}
