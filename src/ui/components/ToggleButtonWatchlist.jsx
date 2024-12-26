import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton } from '@/ui/elements/ToggleButton'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'
import { addToWatchlist, removeFromWatchlist } from '@/redux/user-collections-slice'
import { openAuthModal } from '@/redux/auth-slice' 

export function ToggleButtonWatchlist({ isInWatchlist, movieDetails, userId }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) 

  const handleToggleWatchlist = () => {
    if (!user) {
      dispatch(openAuthModal()) 
      return
    }

    const effectiveUserId = userId || user?.uid 
    if (!effectiveUserId || !movieDetails?.id) {
      return
    }

    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ uid: effectiveUserId, movieId: movieDetails.id }))
    } else {
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
