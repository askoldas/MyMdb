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

    if (!userId || !movieDetails?.id) {
      console.error('User ID and item ID are required')
      return
    }

    const item = {
      id: movieDetails.id.toString(),
      title: movieDetails.title || 'Untitled',
      price: 10.99,
      quantity: 1,
    }

    dispatch(addToCart({ userId, item }))
      .unwrap()
      .then(() => {
        console.log('Item added to cart successfully:', item)
      })
      .catch((error) => {
        console.error('Failed to add item to cart:', error)
      })
  }

  return (
    <Button onClick={handleAddToCart} type={type} size={size}>
      Add to Cart
    </Button>
  )
}
