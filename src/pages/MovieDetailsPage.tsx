import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMovieDetails } from "../api/tmdb";
import type { MovieDetails } from "../types/movie";

import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

import "./MovieDetailsPage.css";

function MovieDetailsPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function loadMovieDetails() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch {
        setError("Could not load movie details.");
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <main className="movie-details-page">
      <div className="movie-details-content">
        {movie.poster_path && (
          <img
            className="movie-details-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        )}

        <div className="movie-details-info">
          <h1>{movie.title}</h1>

          <div className="movie-details-meta">
            <span>
              {movie.release_date
                ? movie.release_date.slice(0, 4)
                : "Unknown year"}
            </span>

            <span>{movie.runtime} min</span>

            <span>★ {movie.vote_average.toFixed(1)}</span>
          </div>

          <div className="movie-details-genres">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <p>{movie.overview}</p>
          <div className="movie-details-actions">
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "",
                    price: 149,
                    productType: "movie",
                  }),
                )
              }
            >
              Add movie to cart
            </button>
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    id: movie.id,
                    title: `${movie.title} Poster`,
                    poster: movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "",
                    price: 99,
                    productType: "poster",
                  }),
                )
              }
            >
              Add poster to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetailsPage;
