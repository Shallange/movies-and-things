import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import MovieCard from "./MovieCard";
import "./PopularMoviesCarousel.css";

const movies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    poster: "https://placehold.co/400x600/211a16/f5f1ed?text=Interstellar",
  },
  {
    id: 2,
    title: "Dune",
    year: 2021,
    rating: 8.0,
    poster: "https://placehold.co/400x600/211a16/f5f1ed?text=Dune",
  },
  {
    id: 3,
    title: "Blade Runner 2049",
    year: 2017,
    rating: 8.0,
    poster: "https://placehold.co/400x600/211a16/f5f1ed?text=Blade+Runner",
  },
  {
    id: 4,
    title: "The Batman",
    year: 2022,
    rating: 7.8,
    poster: "https://placehold.co/400x600/211a16/f5f1ed?text=The+Batman",
  },
  {
    id: 5,
    title: "Arrival",
    year: 2016,
    rating: 7.9,
    poster: "https://placehold.co/400x600/211a16/f5f1ed?text=Arrival",
  },
];

function PopularMoviesCarousel() {
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

    updateSelectedIndex();

    emblaApi.on("select", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
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
                year={movie.year}
                rating={movie.rating}
                poster={movie.poster}
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
