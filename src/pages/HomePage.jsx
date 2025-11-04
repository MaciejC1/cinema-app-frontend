import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MovieHeroCard from "../components/cards/MovieHeroCard";

const movies = [
  {
    title: "Until Dawn",
    description: "W rocznicę zaginięcia siostry, Clover wraz z przyjaciółmi wybiera się w to samo miejsce. Tam ściga ich morderca, a każdy poranek zaczyna się od nowa.",
    image: "https://image.tmdb.org/t/p/original/opSyE1w2QzskFAko0JHtiSrBY6e.jpg",
    director: "David F. Sandberg",
    duration: "1h 48min",
    rating: 5,
    geners: ["Action", "Horror"]
  },
  {
    title: "The Matrix",
    description: "A hacker discovers the reality he lives in is a simulated world and joins a rebellion to free humanity from its control.",
    image: "https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABa1-HdLMtLsG4De530qOzpDG7UutSqbTLC-jAzgSe7mN0luYvSy5dMlLo2HE2DZrZkAVcITCsjnEJJxl1O4LBPS1sk3iSJKZlHGa.jpg?r=451",
    director: "The Wachowskis",
    duration: "2h 16min",
    rating: 4,
    geners: ["Action", "Sci-Fi"]
  }
];

const HomePage = () => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full relative">

            {/* Hero Slider */}
            <div className="w-full flex justify-center overflow-hidden">
                <div className="w-full max-w-[1920px] aspect-[16/8] relative">
                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        spaceBetween={0}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="w-full h-full"
                    >
                        {movies.map((movie, idx) => (
                            <SwiperSlide key={idx}>
                                <MovieHeroCard
                                    title={movie.title}
                                    description={movie.description}
                                    image={movie.image}
                                    director={movie.director}
                                    duration={movie.duration}
                                    rating={movie.rating}
                                    geners={movie.geners}
                                    isActive={activeIndex === idx}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4">
                <button
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    className="w-10 h-10 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={32} color="#DF2144" />
                </button>

                <div className="flex gap-2">
                    {movies.map((_, idx) => (
                        <span
                            key={idx}
                            onClick={() => swiperRef.current?.swiper.slideTo(idx)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${idx === activeIndex ? "bg-primary shadow-[0_0_10px_#DF2144] scale-125" : "bg-primary/50"} hover:scale-125`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="w-10 h-10 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white"
                    aria-label="Next slide"
                >
                    <ChevronRight size={32} color="#DF2144" />
                </button>
            </div>

        </div>
    );
};

export default HomePage;
