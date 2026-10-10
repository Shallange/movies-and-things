import { Link } from "react-router";
import "./MovieCard.css";

type MovieCardProps = {
  id: number;
  title: string;
  year: number;
  rating: number;
  poster: string;
};

function MovieCard({ id, title, year, rating, poster }: MovieCardProps) {
  return (
    <Link to={`/movies/${id}`} className="movie-card-link">
      <article className="movie-card">
        <img
          className="movie-card__poster"
          src={poster}
          alt={`${title} poster`}
        />

        <div className="movie-card__info">
          <h3>{title}</h3>

          <div className="movie-card__meta">
            <span>{year}</span>
            <span>★ {rating.toFixed(1)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;
