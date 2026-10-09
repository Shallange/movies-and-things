import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { searchMovies } from "../api/tmdb";
import type { Movie } from "../types/movie";

import "./MoviesPage.css";

function MoviesPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    async function loadSearchResults() {
      try {
        setLoading(true);
        setError(null);

        const data = await searchMovies(query);
        setMovies(data);
      } catch {
        setError("Could not search movies.");
      } finally {
        setLoading(false);
      }
    }

    loadSearchResults();
  }, [query]);

  return (
    <main className="movies-page">
      <h1>{query ? `Search results for "${query}"` : "Movies"}</h1>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && query && movies.length === 0 && (
        <p>No movies found.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <p key={movie.id}>{movie.title}</p>
          ))}
        </div>
      )}
    </main>
  );
}

export default MoviesPage;
