import { useEffect, useState } from "react";
import "./HomePage.css";
import PopularMoviesCarousel from "../components/PopularMoviesCarousel";
import { getPopularMovies } from "../api/tmdb";
import type { Movie } from "../types/movie";

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        setLoading(true);

        const data = await getPopularMovies();
        setMovies(data);
      } catch {
        setError("Could not load popular movies.");
      } finally {
        setLoading(false);
      }
    }

    loadPopularMovies();
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Movies & Things</h1>
          <p>Discover movies and find something worth watching.</p>

          <input type="text" placeholder="Search for a movie..." />
        </div>
      </section>

      <section className="popular">
        <h2>Popular movies</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <PopularMoviesCarousel movies={movies} />}
      </section>
    </main>
  );
}

export default HomePage;
