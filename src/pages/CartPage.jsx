import { useSelector } from 'react-redux'
import { ShoppingCart } from '@/ui/components/ShoppingCart'
import { Page } from '@/pages/Page'
import '@/styles/pages/cart-page.scss'

export function CartPage() {
  const userId = useSelector((state) => state.auth.user?.uid)

  return (
    <Page>
      <div className="cart-page">
        <h1>Your Cart</h1>
        <ShoppingCart userId={userId} />
      </div>
    </Page>
  )
}
