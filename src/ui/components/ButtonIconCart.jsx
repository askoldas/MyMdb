import { IconButton } from '@/ui/elements/ButtonIcon'
import CartIcon from '@/assets/icons/Cart.svg'
import { useDispatch, useSelector } from 'react-redux'
import { openAuthModal } from '@/redux/auth-slice'
import { useNavigate } from 'react-router-dom'

export function CartButton() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  const handleClick = () => {
    if (!user) {
      dispatch(openAuthModal())
      return
    }
    navigate('/cart')
  }

  return <IconButton icon={CartIcon} ariaLabel="Go to cart" onClick={handleClick} />
}
