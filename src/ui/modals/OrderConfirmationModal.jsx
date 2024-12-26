import { Modal } from '@ui/modals/Modal'

export function OrderConfirmationModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Item Added to Cart</h2>
      <p>Your item has been successfully added to the cart!</p>
    </Modal>
  )
}