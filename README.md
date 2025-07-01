# 🎓 MyMdb – Final Diploma Project

## Project Summary

**MyMdb** is a single-page React application built around three core technologies: the TMDb API for movie data, Firebase Authentication for secure user login, and Firestore for storing user-specific data such as favorites, watchlists, and ratings. The app allows users to search, browse, and organize movies with a clean, responsive UI styled in SCSS.

In addition to the core movie discovery features, a functional shopping cart system was implemented as a technical exercise to explore Firebase’s real-time data handling and CRUD operations. Although it doesn’t directly align with the movie app concept, the cart simulates a “Buy Poster / DVD” feature and demonstrates dynamic order storage with centralized state management via Redux.

**Live demo:** [https://askoldas.github.io/MyMdb/](https://askoldas.github.io/MyMdb/)

---

## ✨ Key Features

- Authentication via Firebase (Sign in / Sign out)
- Movie search and discovery using TMDb API
- Favorites, Watchlist, Rated sections per user
- Detailed movie pages with cast and release info
- Shopping cart with:
  - Add/remove items
  - Quantity control
  - Persistent cart per user in Firestore
  - Store submitted orders
- User-specific data stored and retrieved from Firebase Firestore
- Responsive UI styled with SCSS
- Deployed on GitHub Pages

---

## 🧰 Technologies Used

- React + React Router
- Redux Toolkit for global state
- Firebase (Authentication & Firestore Database)
- TMDb API for movie metadata
- Axios for API requests
- Vite for dev/build tooling
- SCSS for styling
- GitHub Pages for deployment

---

## 🙌 Acknowledgements

- **TMDb** for access to movie data and assets  
- **Firebase** for backend infrastructure  
- Special thanks to the instructors and fellow students at **TMS School** for their support and feedback during the development of this project
