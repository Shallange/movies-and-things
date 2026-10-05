import "./MovieCard.css";

type MovieCardProps = {
  title: string;
  year: number;
  rating: number;
  poster: string;
};

function MovieCard({
  title,
  year,
  rating,
  poster,
}: MovieCardProps) {
  return (
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
          <span>★ {rating}</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;