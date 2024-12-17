import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase'; 
import { useState } from 'react';

//TODO

export function useRequireAuth() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const requireAuth = (callback) => {
    if (auth.currentUser) {
      // If the user is authenticated, execute the callback (navigate or any action)
      callback();
    } else {
      // If not authenticated, trigger the login modal
      setAuthModalOpen(true);
    }
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  return { requireAuth, isAuthModalOpen, closeAuthModal };
}
