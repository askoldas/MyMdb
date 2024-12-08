import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthModal } from '@/ui/modals/AuthModal'
import { auth } from '@/firebase'
import UserIcon from '@/assets/icons/User.svg'
import '@/styles/components/user-badge.scss'

export function UserBadge() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const handleBadgeClick = () => {
    if (userName) navigate('/profile')
    else setAuthModalOpen(true)
  }

  const getInitial = () => userName.charAt(0).toUpperCase()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserName(user.displayName || user.email)
      else setUserName('')
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="user-badge" onClick={handleBadgeClick}>
      <div className="user-badge__badge">
        {userName ? (
          <span className="user-badge__initial">{getInitial()}</span>
        ) : (
          <img src={UserIcon} alt="User Icon" className="user-badge__icon" />
        )}
      </div>
      <span className="user-badge__text">{userName || 'Sign In'}</span>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  )
}
