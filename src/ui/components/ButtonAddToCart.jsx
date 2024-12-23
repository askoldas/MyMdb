import { useDispatch } from 'react-redux'
import { Button } from '@/ui/elements/Button'
import { addToCart } from '@/redux/cart-slice'

export function ButtonAddToCart({
  userId,
  movieDetails,
  type = 'primary', // Default to primary
  size = 'large', // Default to large
}) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    if (!userId) {
      console.error('User is not logged in')
      return
    }

    const item = {
      id: movieDetails.id?.toString(),
      title: movieDetails.title,
      price: 10.99, // Replace with actual price if available
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
