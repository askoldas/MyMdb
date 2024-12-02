import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/ui/modals/Modal'
import { AuthForm } from '@/ui/forms/AuthForm'
import { auth } from '@/firebase'
import UserIcon from '@/assets/icons/User.svg'
import '@/styles/components/user-badge.scss'

export function UserBadge() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);

  const handleBadgeClick = () => {
    if (userName) {
      navigate('/profile'); // Redirect to profile page
    } else {
      handleOpenAuthModal(); // Open login/signup modal if not logged in
    }
  };

  const getInitial = () => userName.charAt(0).toUpperCase();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="user-badge" onClick={handleBadgeClick}>
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

      {/* Modal for Login/Signup */}
      <Modal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal}>
        <AuthForm onClose={handleCloseAuthModal} />
      </Modal>
    </div>
  );
}
