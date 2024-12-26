import { IconButton } from '@/ui/elements/ButtonIcon'
import CartIcon from '@/assets/icons/Cart.svg'
import { useDispatch, useSelector } from 'react-redux'
import { openAuthModal } from '@/redux/auth-slice'

export function CartButton() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) // Access current user from Redux

  const handleClick = () => {
    if (!user) {
      console.log('[CartButton] User is not authenticated. Opening modal...')
      dispatch(openAuthModal()) // Open modal if user is not authenticated
      return
    }

    console.log('[CartButton] User authenticated. Navigating to /cart...')
    window.location.href = '/cart' // Navigate to cart if authenticated
  }

  return (
    <IconButton icon={CartIcon} ariaLabel="Go to cart" onClick={handleClick} />
  )
}
