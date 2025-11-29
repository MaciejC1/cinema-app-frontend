import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import MovieSmallCard from "../cards/MovieSmallCard";

const MovieCarousel = ({ title, movies, isUpcoming = false }) => {
  const swiperRef = useRef(null);
  
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl">{title}</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="w-9 h-9 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white cursor-pointer"
          >
            <ChevronLeft size={24} color="#DF2144" />
          </button>
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="w-9 h-9 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white cursor-pointer"
          >
            <ChevronRight size={24} color="#DF2144" />
          </button>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        loop={true}
        className="w-full"
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <MovieSmallCard
            title={movie.title}
            rating={movie.averageRating}
            duration={movie.durationMinutes}
            image={movie.poster}
            releaseDate={movie.releaseDate ?? ""}
            slug={movie.slug}
            isUpcoming={isUpcoming} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
