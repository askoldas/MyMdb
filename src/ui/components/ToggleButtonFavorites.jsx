import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToggleButton } from '@/ui/elements/ToggleButton';
import { AuthModal } from '@/ui/modals/AuthModal';
import FavoritesIcon from '@/assets/icons/Favorites.svg?react';

export function ToggleButtonFavorites({ isFavorite, onToggleFavorite }) {
  const user = useSelector((state) => state.auth.user); // Check if the user is logged in
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleToggle = () => {
    if (user) {
      // User is logged in, proceed with the favorite toggle action
      onToggleFavorite();
    } else {
      // User is not logged in, open the authentication modal
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <ToggleButton
        isActive={isFavorite}
        onToggle={handleToggle}
        label="Toggle Favorite"
        Icon={FavoritesIcon}
      />
      {/* Render the authentication modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
