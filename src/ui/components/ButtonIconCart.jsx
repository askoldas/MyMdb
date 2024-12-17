import { IconButton } from '@/ui/elements/ButtonIcon'
import CartIcon from '@/assets/icons/Cart.svg'
import { useNavigate } from 'react-router-dom'

export function CartButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/cart')
  }

  return (
    <IconButton icon={CartIcon} ariaLabel="Go to cart" onClick={handleClick} />
  )
}
