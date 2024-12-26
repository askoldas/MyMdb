import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { auth } from '@/firebase'
import UserIcon from '@/assets/icons/User.svg'
import '@/styles/components/user-badge.scss'

export function UserBadge() {
  const { requireAuth } = useRequireAuth() // Use the hook for authentication logic
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const handleBadgeClick = () => {
    requireAuth(() => {
      navigate('/profile') // Navigate to profile if authenticated
    })
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
    </div>
  )
}
