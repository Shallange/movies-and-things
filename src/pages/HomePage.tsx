import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PopularMoviesCarousel from "../components/PopularMoviesCarousel";
import SearchBar from "../components/SearchBar";
import { getPopularMovies } from "../api/tmdb";
import type { Movie } from "../types/movie";
import "./HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleSearch(query: string) {
    navigate(`/movies?query=${encodeURIComponent(query)}`);
  }

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

          <SearchBar onSearch={handleSearch} />
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
