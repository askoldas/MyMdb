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
    people: '/search/person',
  },
  people: {
    details: (id) => `/person/${id}`,
    popular: '/person/popular',
  },
  discover: {
    movies: '/discover/movie', // Add discover endpoint for movies
  },
};
