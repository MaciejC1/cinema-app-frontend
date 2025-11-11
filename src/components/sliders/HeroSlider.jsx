import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieHeroCard from "../cards/MovieHeroCard";

const HeroSlider = ({ movies }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = window.innerWidth < 800;

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <div className="w-full max-w-[1920px] aspect-16/8 relative">

        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          speed={0}
          className="w-full h-full"
          allowTouchMove={isMobile}
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={idx}>
              <MovieHeroCard {...movie} isActive={activeIndex === idx} ageRating={18} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="w-10 h-10 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} color="#DF2144" />
          </button>

          <div className="flex gap-2">
            {movies.map((_, idx) => (
              <span
                key={idx}
                onClick={() => swiperRef.current?.swiper.slideTo(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  idx === activeIndex
                    ? "bg-primary shadow-[0_0_10px_#DF2144] scale-125"
                    : "bg-primary/50"
                } hover:scale-125`}
              />
            ))}
          </div>

          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="w-10 h-10 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={32} color="#DF2144" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
