import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWatchlist,
  addToFavorites,
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist,
} from '@/redux/movies-slice';
import { MoviesList } from '@/ui/sections/MoviesList';
import { Page } from '@/ui/pages/Page';

export function WatchlistPage() {
  const dispatch = useDispatch();
  const { watchlist, favorites, loading, error } = useSelector((state) => state.movies);
  const userId = useSelector((state) => state.auth.user?.uid);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWatchlist(userId));
    }
  }, [dispatch, userId]);

  const handleToggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFromFavorites({ uid: userId, movieId: movie.id }));
    } else {
      dispatch(addToFavorites({ uid: userId, movie }));
    }
  };

  const handleToggleWatchlist = (movie) => {
    if (watchlist.some((item) => item.id === movie.id)) {
      dispatch(removeFromWatchlist({ uid: userId, movieId: movie.id }));
    } else {
      dispatch(addToWatchlist({ uid: userId, movie }));
    }
  };

  if (loading) return <Page><p>Loading watchlist...</p></Page>;
  if (error) return <Page><p>Error loading watchlist: {error}</p></Page>;
  if (!watchlist || watchlist.length === 0) return <Page><p>No movies in your watchlist</p></Page>;

  return (
    <Page>
      <MoviesList
        movies={watchlist}
        favorites={favorites}
        watchlist={watchlist}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
      />
    </Page>
  );
}
