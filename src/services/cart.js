import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export async function addItemToCart(userId, item) {
  const { id, title, price, quantity } = item
  const cartRef = doc(db, 'users', userId, 'cart', id)
  await setDoc(cartRef, { id, title, price, quantity }, { merge: true })
}

export async function fetchCartItems(userId) {
  const cartRef = collection(db, 'users', userId, 'cart')
  const snapshot = await getDocs(cartRef)
  return snapshot.docs.map((doc) => doc.data())
}

export async function updateCartItemQuantity(userId, itemId, quantity) {
  const cartRef = doc(db, 'users', userId, 'cart', itemId)
  await updateDoc(cartRef, { quantity })
}

export async function removeItemFromCart(userId, itemId) {
  const cartRef = doc(db, 'users', userId, 'cart', itemId)
  await deleteDoc(cartRef)
}
