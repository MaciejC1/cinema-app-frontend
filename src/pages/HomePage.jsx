import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MovieHeroCard from "../components/cards/MovieHeroCard";
import MovieSmallCard from "../components/cards/MovieSmallCard";
import ContentWrapper from "../layouts/ContentWrapper";

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
        title: "To: Rozdział 2",
        description: "Zło wkrada się do miasteczka Derry położonego w stanie Maine co 27 lat. 'To: Rozdział 2' ponownie gromadzi znanych nam z części pierwszej, dorosłych już bohaterów, którzy spotykają się prawie trzydzieści lat po wydarzeniach przedstawionych w filmie 'To'.",
        image: "https://image.tmdb.org/t/p/original/ycnDQVqHerSaQWQkemHcXOPOnA0.jpg",
        director: "The Wachowskis",
        duration: "2h 16min",
        rating: 4,
        geners: ["Action", "Horror"]
    }
];

export const smallMovies = [
    {
        title: "Dune: Part Two",
        rating: 5,
        duration: "2h 46m",
        image: "https://image.tmdb.org/t/p/original/xdfO6EB9e59qZpzmHxezTdPfTxZ.jpg"
    },
    {
        title: "The Batman",
        rating: 4,
        duration: "2h 55m",
        image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    },
    {
        title: "Oppenheimer",
        rating: 5,
        duration: "3h 0m",
        image: "https://image.tmdb.org/t/p/original/eHjIEiEKTnb9euehI7IbCxtGH5N.jpg"
    },
    {
        title: "Spider-Man: No Way Home",
        rating: 4,
        duration: "2h 28m",
        image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
    },
    {
        title: "John Wick: Chapter 4",
        rating: 5,
        duration: "2h 49m",
        image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
    },
    {
        title: "Avatar: The Way of Water",
        rating: 4,
        duration: "3h 12m",
        image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
    },
    {
        title: "The Dark Knight",
        rating: 5,
        duration: "2h 32m",
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
];

export const upcomingMovies = [
    {
        title: "Gladiator II",
        duration: "2h 30m",
        image: "https://image.tmdb.org/t/p/original/q6mkkb5XU6ERF7xP9nAjnNq9n7V.jpg",
        releaseDate: "22.11.2025"
    },
    {
        title: "Deadpool 3",
        duration: "2h 05m",
        image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wlKU9yB0Q8nfPMakBcSBT0JGS7.jpg",
        releaseDate: "25.07.2024"
    },
    {
        title: "Avatar 3",
        duration: "3h 10m",
        image: "https://image.tmdb.org/t/p/original/m0UoNRK2H2TsR1EbzgngF4vlOsU.jpg",
        releaseDate: "19.12.2025"
    },
    {
        title: "The Batman: Part II",
        duration: "2h 50m",
        image: "https://image.tmdb.org/t/p/original/g3rQrmiaXx5mltb5HiBkYhj6Rlb.jpg",
        releaseDate: "02.10.2026"
    },
    {
        title: "Spider-Man: Beyond the Spider-Verse",
        duration: "2h 15m",
        image: "https://image.tmdb.org/t/p/original/2lY3hLaHnMhsOSZxOhefzyhcE7x.jpg",
        releaseDate: "28.03.2025"
    },
    {
        title: "Tron: Ares",
        duration: "2h 20m",
        image: "https://image.tmdb.org/t/p/original/ka2nUSgSCLfvaXjOgaTVHxrFl82.jpg",
        releaseDate: "10.10.2025"
    }
];



const HomePage = () => {
    const swiperRef = useRef(null);
    const secondSwiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isMobile = window.innerWidth < 800;

    return (
        <div className="w-full relative">

            {/* Hero Slider */}
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
                                <MovieHeroCard
                                    title={movie.title}
                                    description={movie.description}
                                    image={movie.image}
                                    director={movie.director}
                                    duration={movie.duration}
                                    rating={movie.rating}
                                    geners={movie.geners}
                                    isActive={activeIndex === idx}
                                    ageRating={18}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation — PRZENIESIONE DO TEGO BLOKU */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
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
                                    className={`w-3 h-3 rounded-full cursor-pointer transition-all ${idx === activeIndex
                                        ? "bg-primary shadow-[0_0_10px_#DF2144] scale-125"
                                        : "bg-primary/50"
                                        } hover:scale-125`}
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
            </div>

            <ContentWrapper>
                <div className="mt-5">
                    <div className="mt-6 flex items-center justify-between">
                        <h2 className="text-3xl">Aktualnie w kinie</h2>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => secondSwiperRef.current?.swiper.slidePrev()}
                                className="w-9 h-9 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white"
                            ><ChevronLeft size={24} color="#DF2144" /></button>

                            <button
                                onClick={() => secondSwiperRef.current?.swiper.slideNext()}
                                className="w-9 h-9 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white"
                            ><ChevronRight size={24} color="#DF2144" /></button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Swiper
                            ref={secondSwiperRef}
                            modules={[Navigation]}
                            slidesPerView={5}
                            spaceBetween={20}
                            className="w-full"
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },
                            }}
                        >
                            {smallMovies.map((movie, idx) => (
                                <SwiperSlide key={idx}>
                                    <MovieSmallCard
                                        title={movie.title}
                                        image={movie.image}
                                        duration={movie.duration}
                                        rating={movie.rating}
                                        isUpcoming={false}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </ContentWrapper>


            <ContentWrapper>
                <div className="mt-20 mb-10">
                    <div className="mt-6 flex items-center justify-between">
                        <h2 className="text-3xl">Wkrótce w kinie</h2>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => secondSwiperRef.current?.swiper.slidePrev()}
                                className="w-9 h-9 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white"
                            ><ChevronLeft size={24} color="#DF2144" /></button>

                            <button
                                onClick={() => secondSwiperRef.current?.swiper.slideNext()}
                                className="w-9 h-9 rounded-full bg-[#1E1E1E] backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white"
                            ><ChevronRight size={24} color="#DF2144" /></button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Swiper
                            ref={secondSwiperRef}
                            modules={[Navigation]}
                            slidesPerView={5}
                            spaceBetween={20}
                            className="w-full"
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },
                            }}
                        >
                            {upcomingMovies.map((movie, idx) => (
                                <SwiperSlide key={idx}>
                                    <MovieSmallCard
                                        title={movie.title}
                                        image={movie.image}
                                        duration={movie.duration}
                                        rating={movie.rating}
                                        releaseDate={movie.releaseDate}
                                        isUpcoming={true}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </ContentWrapper>


        </div>
    );
};

export default HomePage;
