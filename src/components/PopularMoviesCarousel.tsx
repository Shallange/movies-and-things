import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import MovieCard from "./MovieCard";
import "./PopularMoviesCarousel.css";
import type { Movie } from "../types/movie";

type PopularMoviesCarouselProps = {
  movies: Movie[];
};

function PopularMoviesCarousel({ movies }: PopularMoviesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      containScroll: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;


    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  return (
    <div className="carousel">
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          {movies.map((movie, index) => (
            <div
              className={`carousel__slide ${
                index === selectedIndex ? "carousel__slide--active" : ""
              }`}
              key={movie.id}
            >
              <MovieCard
                title={movie.title}
                year={Number(movie.release_date.slice(0, 4))}
                rating={movie.vote_average}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel__controls">
        <button type="button" onClick={() => emblaApi?.scrollPrev()}>
          ←
        </button>

        <button type="button" onClick={() => emblaApi?.scrollNext()}>
          →
        </button>
      </div>
    </div>
  );
}

export default PopularMoviesCarousel;
