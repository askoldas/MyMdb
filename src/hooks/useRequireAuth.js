import { useSelector, useDispatch } from 'react-redux'
import { openAuthModal, closeAuthModal } from '@/redux/auth-slice'

export function useRequireAuth() {
  const dispatch = useDispatch()
  const { user, isAuthModalOpen } = useSelector((state) => state.auth)

  const requireAuth = (callback) => {
    if (user) {
      callback()
    } else {
      dispatch(openAuthModal())
    }
  }

  const handleCloseAuthModal = () => {
    dispatch(closeAuthModal())
  }

  return { requireAuth, isAuthModalOpen, handleCloseAuthModal }
}
