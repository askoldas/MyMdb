import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton } from '@/ui/elements/ToggleButton'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'
import { addToFavorites, removeFromFavorites } from '@/redux/user-collections-slice'
import { openAuthModal } from '@/redux/auth-slice'

export function ToggleButtonFavorites({ isFavorite, movieDetails, userId }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) // Access current user from Redux

  const handleToggleFavorite = () => {
    if (!user) {
      console.log('[ToggleButtonFavorites] User is not authenticated. Opening modal...')
      dispatch(openAuthModal()) // Trigger modal if user is not authenticated
      return
    }

    const effectiveUserId = userId || user?.uid // Fallback to current user ID from Redux
    if (!effectiveUserId || !movieDetails?.id) {
      console.error('[ToggleButtonFavorites] User ID and movie ID are required')
      return
    }

    if (isFavorite) {
      console.log('[ToggleButtonFavorites] Removing from favorites:', movieDetails)
      dispatch(removeFromFavorites({ uid: effectiveUserId, movieId: movieDetails.id }))
    } else {
      console.log('[ToggleButtonFavorites] Adding to favorites:', movieDetails)
      dispatch(addToFavorites({ uid: effectiveUserId, movie: movieDetails }))
    }
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
