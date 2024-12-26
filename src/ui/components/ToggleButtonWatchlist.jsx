import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton } from '@/ui/elements/ToggleButton'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'
import { addToWatchlist, removeFromWatchlist } from '@/redux/user-collections-slice'
import { openAuthModal } from '@/redux/auth-slice' // Import action to open modal

export function ToggleButtonWatchlist({ isInWatchlist, movieDetails, userId }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) // Access user state from Redux

  const handleToggleWatchlist = () => {
    if (!user) {
      console.log('[ToggleButtonWatchlist] User is not authenticated. Opening modal...')
      dispatch(openAuthModal()) // Open modal if user is not authenticated
      return
    }

    const effectiveUserId = userId || user?.uid // Fallback to current user ID from Redux
    if (!effectiveUserId || !movieDetails?.id) {
      console.error('[ToggleButtonWatchlist] User ID and movie ID are required')
      return
    }

    if (isInWatchlist) {
      console.log('[ToggleButtonWatchlist] Removing from watchlist:', movieDetails)
      dispatch(removeFromWatchlist({ uid: effectiveUserId, movieId: movieDetails.id }))
    } else {
      console.log('[ToggleButtonWatchlist] Adding to watchlist:', movieDetails)
      dispatch(addToWatchlist({ uid: effectiveUserId, movie: movieDetails }))
    }
  }

  return (
    <ToggleButton
      isActive={isInWatchlist}
      onToggle={handleToggleWatchlist}
      label="Toggle Watchlist"
      Icon={WatchlistIcon}
    />
  )
}
