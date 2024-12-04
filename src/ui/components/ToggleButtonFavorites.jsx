import React from 'react';
import { ToggleButton } from '@/ui/elements/ToggleButton';
import FavoritesIcon from '@/assets/icons/Favorites.svg?react';

export function ToggleButtonFavorites({ isFavorite, onToggleFavorite }) {
  const handleToggle = () => {
    console.log(`Favorites button toggled. New state: ${!isFavorite}`);
    onToggleFavorite();
  };

  return (
    <ToggleButton
      isActive={isFavorite}
      onToggle={handleToggle}
      activeIcon={<FavoritesIcon className="toggle-button-icon active" />} // Active icon
      inactiveIcon={<FavoritesIcon className="toggle-button-icon" />} // Inactive icon
      label="Toggle Favorites"
    />
  );
}
