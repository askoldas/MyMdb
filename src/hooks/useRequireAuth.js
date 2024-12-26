import { useSelector, useDispatch } from 'react-redux'
import { openAuthModal, closeAuthModal } from '@/redux/auth-slice'

export function useRequireAuth() {
  const dispatch = useDispatch()
  const { user, isAuthModalOpen } = useSelector((state) => state.auth)

  const requireAuth = (callback) => {
    if (user) {
      callback()
    } else {
      dispatch(openAuthModal()) // Open the modal via Redux
    }
  }

  const closeAuthModal = () => {
    dispatch(closeAuthModal()) // Close the modal via Redux
  }

  return { requireAuth, isAuthModalOpen, closeAuthModal }
}
