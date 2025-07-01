export const tmdbBaseURL = 'https://api.themoviedb.org/3';

export const tmdbEndpoints = {
  movies: {
    popular: '/movie/popular',
    topRated: '/movie/top_rated',
    upcoming: '/movie/upcoming',
    details: (id) => `/movie/${id}`,
  },
  search: {
    movies: '/search/movie',
  },
  discover: {
    movies: '/discover/movie',
  },
};
