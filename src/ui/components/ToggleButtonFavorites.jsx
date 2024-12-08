import { ToggleButton } from '@/ui/elements/ToggleButton'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'

export function ToggleButtonFavorites({ isFavorite, onToggleFavorite }) {
  return (
    <ToggleButton
      isActive={isFavorite}
      onToggle={onToggleFavorite}
      label="Toggle Favorite"
      Icon={FavoritesIcon}
    />
  )
}
