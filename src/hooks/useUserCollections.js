import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFavorites,
  fetchWatchlist,
  clearUserCollections
} from '@/redux/user-collections-slice'

export const useUserCollections = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?.uid)
  const { favorites, watchlist } = useSelector((state) => state.userCollections)

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId))
      dispatch(fetchWatchlist(userId))
    } else {
      dispatch(clearUserCollections())
    }
  }, [dispatch, userId])

  return { favorites, watchlist }
}
