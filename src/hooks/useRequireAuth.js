import { useSelector } from 'react-redux'
import { useState } from 'react'

export function useRequireAuth() {
  const { user } = useSelector((state) => state.auth)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
 

  const requireAuth = (callback) => {
    if (user) {
      callback()
    } else {
      setAuthModalOpen(true)
    }
  }

  const closeAuthModal = () => {
    setAuthModalOpen(false)
  }

  return { requireAuth, isAuthModalOpen, closeAuthModal }
}
