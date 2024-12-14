import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore'
import { db } from '@/firebase'

// Add an item to the user's cart
export async function addItemToCart(userId, item) {
  const { id, title, price, quantity } = item

  if (!userId || !id) {
    throw new Error('User ID and item ID are required')
  }

  const cartRef = doc(db, 'users', userId, 'cart', id)
  await setDoc(cartRef, { id, title, price, quantity }, { merge: true })
}

// Fetch all items in the user's cart
export async function fetchCartItems(userId) {
  if (!userId) {
    throw new Error('User ID is required')
  }

  const cartRef = collection(db, 'users', userId, 'cart')
  const snapshot = await getDocs(cartRef)
  return snapshot.docs.map((doc) => doc.data())
}

// Update the quantity of a specific item in the cart
export async function updateCartItemQuantity(userId, itemId, quantity) {
  if (!userId || !itemId) {
    throw new Error('User ID and item ID are required')
  }

  const cartRef = doc(db, 'users', userId, 'cart', itemId)
  await updateDoc(cartRef, { quantity })
}

// Remove a specific item from the user's cart
export async function removeItemFromCart(userId, itemId) {
  if (!userId || !itemId) {
    throw new Error('User ID and item ID are required')
  }

  const cartRef = doc(db, 'users', userId, 'cart', itemId)
  await deleteDoc(cartRef)
}

// Clear all items in the user's cart
export async function clearCart(userId) {
  if (!userId) {
    throw new Error('User ID is required')
  }

  const cartRef = collection(db, 'users', userId, 'cart')
  const snapshot = await getDocs(cartRef)
  const batch = writeBatch(db)

  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}
