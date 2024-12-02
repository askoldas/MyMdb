export const baseURL = 'https://api.themoviedb.org/3'

export const endpoints = {
  movies: {
    popular: '/movie/popular',
    topRated: '/movie/top_rated',
    upcoming: '/movie/upcoming',
    details: (id) => `/movie/${id}`,
  },
  search: {
    movies: '/search/movie',
    tv: '/search/tv',
    people: '/search/person',
  },
  tvShows: {
    popular: '/tv/popular',
    details: (id) => `/tv/${id}`,
  },
  people: {
    details: (id) => `/person/${id}`,
    popular: '/person/popular',
  },
}
