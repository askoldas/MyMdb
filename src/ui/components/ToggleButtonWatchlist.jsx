import { ToggleButton } from '@/ui/elements/ToggleButton'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'
import { addToWatchlist, removeFromWatchlist } from '@/redux/user-collections-slice'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useDispatch } from 'react-redux'

export function ToggleButtonWatchlist({ isInWatchlist, movieDetails, userId }) {
  const dispatch = useDispatch()
  const { requireAuth } = useRequireAuth()

  const handleToggleWatchlist = () => {
    requireAuth(() => {
      const effectiveUserId = userId || user?.uid
      if (!effectiveUserId || !movieDetails?.id) {
        return
      }

      if (isInWatchlist) {
        dispatch(removeFromWatchlist({ uid: effectiveUserId, movieId: movieDetails.id }))
      } else {
        dispatch(addToWatchlist({ uid: effectiveUserId, movie: movieDetails }))
      }
    })
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
