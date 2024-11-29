import '@/styles/App.scss'
import UserIcon from '../assets/icons/User.svg'

export function UserBadge({ userName = '' }) {
  const getInitial = () => userName.charAt(0).toUpperCase()

  return (
    <div className="user-badge">
      <div className="user-badge__badge">
        {userName ? (
          <span className="user-badge__initial">{getInitial()}</span>
        ) : (
          <img src={UserIcon} alt="User Icon" className="user-badge__icon" />
        )}
      </div>
      <span className="user-badge__text">
        {userName || 'Sign In'}
      </span>
    </div>
  )
}
