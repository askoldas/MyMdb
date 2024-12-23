import { useDispatch } from 'react-redux' // Add this line
import { ToggleButton } from '@/ui/elements/ToggleButton'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'
import { addToFavorites, removeFromFavorites } from '@/redux/user-collections-slice'

export function ToggleButtonFavorites({ isFavorite, movieId, userId }) {
  const dispatch = useDispatch()
  const { requireAuth } = useRequireAuth()

  const handleToggleFavorite = () => {
    requireAuth(() => {
      if (isFavorite) {
        dispatch(removeFromFavorites({ uid: userId, movieId }))
      } else {
        dispatch(addToFavorites({ uid: userId, movie: { id: movieId } }))
      }
    })
  }

  return (
    <ToggleButton
      isActive={isFavorite}
      onToggle={handleToggleFavorite}
      label="Toggle Favorite"
      Icon={FavoritesIcon}
    />
  )
}
