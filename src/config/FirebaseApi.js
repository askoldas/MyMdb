export const firebaseEndpoints = {
    users: {
      collection: 'users',
      favorites: (userId) => `users/${userId}/favorites`,
      watchlist: (userId) => `users/${userId}/watchlist`,
    },
    auth: {
      login: '/auth/login',
      signUp: '/auth/signup',
      logout: '/auth/logout',
    },
  };
  