# Movies & Things

A React and TypeScript movie store application built with Vite.

The application uses movie data from the TMDb API and allows users to browse movies, view details, and add movie-related products to a cart.

## Live demo

https://shallange.github.io/movies-and-things/

## Features

- Browse popular movies
- Search movies using the TMDb API
- View detailed information for each movie
- Add movies and posters to a cart
- Remove items from the cart
- View total cart price
- Cart state managed with Redux Toolkit
- Cart persisted with localStorage
- Responsive navigation with live cart count

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- TMDb API
- localStorage

## Getting started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```