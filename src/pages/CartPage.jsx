import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, updateQuantity, removeFromCart } from '@/redux/cart-slice'
import { Button } from '@/ui/elements/Button'
import '@/styles/pages/cart-page.scss'

export function CartPage() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?.uid)
  const { items, totalQuantity, totalPrice, loading, error } = useSelector((state) => state.cart)

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId))
    }
  }, [dispatch, userId])

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ userId, itemId, quantity }))
    }
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ userId, itemId }))
  }

  if (loading) return <div className="loading">Loading your cart...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (items.length === 0) return <div className="empty-cart">Your cart is empty.</div>

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="item-actions">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              />
              <Button type="secondary" size="small" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Summary</h2>
        <p>Total Items: {totalQuantity}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <Button type="primary" size="large">Proceed to Checkout</Button>
      </div>
    </div>
  )
}
