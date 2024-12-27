import { ToggleButton } from '@/ui/elements/ToggleButton'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'
import { addToFavorites, removeFromFavorites } from '@/redux/user-collections-slice'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useDispatch } from 'react-redux'

export function ToggleButtonFavorites({ isFavorite, movieDetails, userId }) {
  const dispatch = useDispatch()
  const { requireAuth } = useRequireAuth()

  const handleToggleFavorite = () => {
    requireAuth(() => {
      const effectiveUserId = userId || user?.uid
      if (!effectiveUserId || !movieDetails?.id) {
        return
      }

      if (isFavorite) {
        dispatch(removeFromFavorites({ uid: effectiveUserId, movieId: movieDetails.id }))
      } else {
        dispatch(addToFavorites({ uid: effectiveUserId, movie: movieDetails }))
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
