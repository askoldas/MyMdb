import { Modal } from '@/ui/modals/Modal'
import { AuthForm } from '@/ui/forms/AuthForm'

export function AuthModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AuthForm onClose={onClose} />
    </Modal>
  )
}
