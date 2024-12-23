import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/cart-slice'
import { Button } from '@/ui/elements/Button'

export function ButtonAddToCart({ userId, movieDetails }) {
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
    <Button onClick={handleAddToCart} type="primary" size="large">
      Add to Cart
    </Button>
  )
}
