import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchMovies,
  fetchFavorites,
  fetchWatchlist,
  addToFavorites,
  addToWatchlist,
  removeFromFavorites,
  removeFromWatchlist,
} from '@/redux/movies-slice'
import { GENRE_MAP } from '@/config/genres'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Pagination } from '@/ui/components/Pagination'
import { Page } from '@/ui/pages/Page'
import '@/styles/pages/movies-page.scss'

export function MoviesPage() {
  const dispatch = useDispatch()
  const {
    list: movies,
    loading,
    error,
    page,
    totalPages,
    favorites,
    watchlist,
  } = useSelector((state) => state.movies)
  const { sortBy, genres, yearRange, ratingRange } = useSelector((state) => state.filter.appliedFilters)
  const userId = useSelector((state) => state.auth.user?.uid) // Get user ID from auth slice

  useEffect(() => {
    dispatch(fetchMovies({ page, sortBy, filters: { genres, yearRange, ratingRange } }))

    if (userId) {
      dispatch(fetchFavorites(userId))
      dispatch(fetchWatchlist(userId))
    }
  }, [dispatch, page, sortBy, genres, yearRange, ratingRange, userId])

  useEffect(() => {
    console.log('Redux Watchlist:', watchlist); // Log the current state of the watchlist
    console.log('Redux Favorites:', favorites); // Log the current state of favorites
  }, [watchlist, favorites, userId]);

  const handlePageChange = (newPage) => {
    dispatch(fetchMovies({ page: newPage, sortBy, filters: { genres, yearRange, ratingRange } }))
  }

  const handleToggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFromFavorites({ uid: userId, movieId: movie.id }))
    } else {
      dispatch(addToFavorites({ uid: userId, movie }))
    }
  }

  const handleToggleWatchlist = (movie) => {
    if (watchlist.some((item) => item.id === movie.id)) {
      dispatch(removeFromWatchlist({ uid: userId, movieId: movie.id }))
    } else {
      dispatch(addToWatchlist({ uid: userId, movie }))
    }
  }

  if (loading) return <Page><p>Loading movies...</p></Page>
  if (error) return <Page><p>Error loading movies: {error}</p></Page>

  return (
    <Page>
      <div className="movies-page">
        <MoviesList
          movies={movies}
          favorites={favorites}
          watchlist={watchlist}
          onToggleFavorite={handleToggleFavorite}
          onToggleWatchlist={handleToggleWatchlist}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Page>
  )
}
