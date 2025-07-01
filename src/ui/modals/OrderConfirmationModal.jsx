import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@/ui/modals/Modal'
import { closeOrderConfirmationModal } from '@/redux/cart-slice'

export function OrderConfirmationModal() {
  const isOpen = useSelector((state) => state.cart.isOrderConfirmationModalOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(closeOrderConfirmationModal())
      }, 2000)

      return () => clearTimeout(timer) 
    }
  }, [isOpen, dispatch])

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeOrderConfirmationModal())}>
      <h2>Item Added to Cart</h2>
      <p>Your item has been successfully added to the cart!</p>
    </Modal>
  )
}
