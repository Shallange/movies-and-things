import type { Movie } from "../types/movie";

type PopularMoviesResponse = {
  results: Movie[];
};

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data: PopularMoviesResponse = await response.json();

  return data.results;
}
