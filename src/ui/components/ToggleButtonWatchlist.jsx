import { useDispatch } from 'react-redux'
import { ToggleButton } from '@/ui/elements/ToggleButton'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'
import { addToWatchlist, removeFromWatchlist } from '@/redux/user-collections-slice'

export function ToggleButtonWatchlist({ isInWatchlist, movieDetails, userId }) {
  const dispatch = useDispatch()
  const { requireAuth } = useRequireAuth()

  const handleToggleWatchlist = () => {
    requireAuth(() => {
      if (isInWatchlist) {
        dispatch(removeFromWatchlist({ uid: userId, movieId: movieDetails.id }))
      } else {
        dispatch(addToWatchlist({ uid: userId, movie: movieDetails }))
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
