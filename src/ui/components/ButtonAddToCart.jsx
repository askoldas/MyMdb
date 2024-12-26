import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/ui/elements/Button'
import { addToCart } from '@/redux/cart-slice'
import { openAuthModal } from '@/redux/auth-slice'

export function ButtonAddToCart({ userId, movieDetails, type = 'primary', size = 'large' }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) // Access current user from Redux

  const handleAddToCart = () => {
    console.log('Attempting to add to cart:', { userId, movieDetails })

    // Check authentication
    if (!user) {
      console.log('[ButtonAddToCart] User is not authenticated. Opening modal...')
      dispatch(openAuthModal()) // Trigger modal if user is not authenticated
      return
    }

    // Validate input
    const effectiveUserId = userId || user?.uid // Fallback to current user ID from Redux
    if (!effectiveUserId || !movieDetails?.id) {
      console.error('[ButtonAddToCart] User ID and item ID are required')
      return
    }

    const item = {
      id: movieDetails.id.toString(),
      title: movieDetails.title || 'Untitled',
      price: movieDetails.price || 10.99, // Use a default price if not provided
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
