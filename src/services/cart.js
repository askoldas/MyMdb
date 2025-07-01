import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, writeBatch, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export async function addItemToCart(userId, item) {
  const { id, title, price, quantity } = item
  if (!userId || !id) throw new Error('User ID and item ID are required')

  const cartRef = doc(db, 'users', userId, 'cart', id)
  const existingDoc = await getDoc(cartRef)

  if (existingDoc.exists()) {
    const existingData = existingDoc.data()
    await updateDoc(cartRef, { quantity: existingData.quantity + quantity })
  } else {
    await setDoc(cartRef, { id, title, price, quantity }, { merge: true })
  }
}

export async function fetchCartItems(userId) {
  if (!userId) throw new Error('User ID is required')
  const cartRef = collection(db, 'users', userId, 'cart')
  const snapshot = await getDocs(cartRef)
  return snapshot.docs.map((doc) => doc.data())
}

export async function updateCartItemQuantity(userId, itemId, quantity) {
  if (!userId || !itemId) throw new Error('User ID and item ID are required')
  const cartRef = doc(db, 'users', userId, 'cart', itemId)
  await updateDoc(cartRef, { quantity })
}

export async function removeItemFromCart(userId, itemId) {
  if (!userId || !itemId) throw new Error('User ID and item ID are required')
  const cartRef = doc(db, 'users', userId, 'cart', itemId)
  await deleteDoc(cartRef)
}

export async function clearCart(userId) {
  if (!userId) throw new Error('User ID is required')
  const cartRef = collection(db, 'users', userId, 'cart')
  const snapshot = await getDocs(cartRef)
  const batch = writeBatch(db)
  snapshot.forEach((doc) => batch.delete(doc.ref))
  await batch.commit()
}

export async function checkoutOrder(userId) {
  if (!userId) throw new Error('User ID is required')
  const cartItems = await fetchCartItems(userId)
  if (cartItems.length === 0) throw new Error('Cart is empty')

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const order = {
    userId,
    items: cartItems,
    totalPrice,
    orderDate: new Date().toISOString(),
    status: 'pending'
  }

  const ordersRef = collection(db, 'orders')
  const newOrderRef = doc(ordersRef)
  await setDoc(newOrderRef, { ...order, id: newOrderRef.id })
  await clearCart(userId)

  return newOrderRef.id
}
