import { db } from '@/firebase'
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore'

// Add a document to a specified subcollection
export const addToFirestoreCollection = async (uid, collectionName, data) => {
  try {
    const docRef = doc(db, `users/${uid}/${collectionName}`, data.id.toString())
    await setDoc(docRef, data)
    return data
  } catch (error) {
    console.error(`Error adding to Firestore ${collectionName}:`, error.message)
    throw new Error('Failed to add data. Please try again later.')
  }
}

// Remove a document from a specified subcollection
export const removeFromFirestoreCollection = async (uid, collectionName, docId) => {
  try {
    const docRef = doc(db, `users/${uid}/${collectionName}`, docId.toString())
    await deleteDoc(docRef)
    return docId
  } catch (error) {
    console.error(`Error removing from Firestore ${collectionName}:`, error.message)
    throw new Error('Failed to remove data. Please try again later.')
  }
}

// Fetch all documents from a subcollection
export const fetchFirestoreCollection = async (uid, collectionName) => {
  try {
    const collectionRef = collection(db, `users/${uid}/${collectionName}`)
    const snapshot = await getDocs(collectionRef)
    return snapshot.docs.map((doc) => doc.data())
  } catch (error) {
    console.error(`Error fetching Firestore ${collectionName}:`, error.message)
    throw new Error('Failed to fetch data. Please try again later.')
  }
}
