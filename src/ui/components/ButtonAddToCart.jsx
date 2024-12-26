import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/ui/elements/Button'
import { addToCart } from '@/redux/cart-slice'
import { openAuthModal } from '@/redux/auth-slice'

export function ButtonAddToCart({ userId, movieDetails, type = 'primary', size = 'large' }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) 

  const handleAddToCart = () => {

    // Check authentication
    if (!user) {
      dispatch(openAuthModal())
      return
    }

    // Validate input
    const effectiveUserId = userId || user?.uid 
    if (!effectiveUserId || !movieDetails?.id) {
      return
    }

    const item = {
      id: movieDetails.id.toString(),
      title: movieDetails.title || 'Untitled',
      price: movieDetails.price || 10.99, 
      quantity: 1,
    }

    dispatch(addToCart({ userId: effectiveUserId, item }))
      .unwrap()
      .then(() => {
        console.log('[ButtonAddToCart] Item added to cart successfully:', item)
      })
      .catch((error) => {
        console.error('[ButtonAddToCart] Failed to add item to cart:', error)
      })
  }

  return (
    <Button onClick={handleAddToCart} type={type} size={size}>
      Add to Cart
    </Button>
  )
}
