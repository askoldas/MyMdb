import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton } from '@/ui/elements/ToggleButton'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'
import { addToFavorites, removeFromFavorites } from '@/redux/user-collections-slice'
import { openAuthModal } from '@/redux/auth-slice'

export function ToggleButtonFavorites({ isFavorite, movieDetails, userId }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) 

  const handleToggleFavorite = () => {
    if (!user) {
      dispatch(openAuthModal())
      return
    }

    const effectiveUserId = userId || user?.uid
    if (!effectiveUserId || !movieDetails?.id) {
      return
    }

    if (isFavorite) {
      dispatch(removeFromFavorites({ uid: effectiveUserId, movieId: movieDetails.id }))
    } else {
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
