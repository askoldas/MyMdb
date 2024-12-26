import { Modal } from '@/ui/modals/Modal'
import { AuthForm } from '@/ui/forms/AuthForm'
import { useSelector, useDispatch } from 'react-redux'
import { closeAuthModal } from '@/redux/auth-slice'

export function AuthModal() {
  const isOpen = useSelector((state) => state.auth.isAuthModalOpen)
  const dispatch = useDispatch()
  
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeAuthModal())}>
      <AuthForm onClose={() => dispatch(closeAuthModal())} />
    </Modal>
  )
}
