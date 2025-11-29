import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HeroSlider from "../components/sliders/HeroSlider";
import MovieCarousel from "../components/sliders/MovieCarousel";
import ContentWrapper from "../layouts/ContentWrapper";

import { useActiveMovies, useUpcomingMovies } from "../api/hooks/movieQueries";

const movies = [
    {
        title: "Until Dawn",
        description: "W rocznicę zaginięcia siostry, Clover wraz z przyjaciółmi wybiera się w to samo miejsce. Tam ściga ich morderca, a każdy poranek zaczyna się od nowa.",
        image: "https://image.tmdb.org/t/p/original/opSyE1w2QzskFAko0JHtiSrBY6e.jpg",
        director: "David F. Sandberg",
        duration: "1h 48min",
        rating: 5,
        geners: ["Action", "Horror"],
        slug: "until-dawn"
    },
    {
        title: "To: Rozdział 2",
        description: "Zło wkrada się do miasteczka Derry położonego w stanie Maine co 27 lat. 'To: Rozdział 2' ponownie gromadzi znanych nam z części pierwszej, dorosłych już bohaterów, którzy spotykają się prawie trzydzieści lat po wydarzeniach przedstawionych w filmie 'To'.",
        image: "https://image.tmdb.org/t/p/original/ycnDQVqHerSaQWQkemHcXOPOnA0.jpg",
        director: "The Wachowskis",
        duration: "2h 16min",
        rating: 4,
        geners: ["Action", "Horror"],
        slug: "until-dawn"
    },
    {
        title: "Until Dawn",
        description: "W rocznicę zaginięcia siostry, Clover wraz z przyjaciółmi wybiera się w to samo miejsce. Tam ściga ich morderca, a każdy poranek zaczyna się od nowa.",
        image: "https://image.tmdb.org/t/p/original/opSyE1w2QzskFAko0JHtiSrBY6e.jpg",
        director: "David F. Sandberg",
        duration: "1h 48min",
        rating: 5,
        geners: ["Action", "Horror"],
        slug: "until-dawn"
    },
    {
        title: "To: Rozdział 2",
        description: "Zło wkrada się do miasteczka Derry położonego w stanie Maine co 27 lat. 'To: Rozdział 2' ponownie gromadzi znanych nam z części pierwszej, dorosłych już bohaterów, którzy spotykają się prawie trzydzieści lat po wydarzeniach przedstawionych w filmie 'To'.",
        image: "https://image.tmdb.org/t/p/original/ycnDQVqHerSaQWQkemHcXOPOnA0.jpg",
        director: "The Wachowskis",
        duration: "2h 16min",
        rating: 4,
        geners: ["Action", "Horror"],
        slug: "until-dawn"
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

export const upcomingMovies2 = [
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
    const { data: activeMovies, isLoading: isActiveLoading, error: activeError } = useActiveMovies();
    const { data: upcomingMovies, isLoading: isUpcomingLoading, error: upcomingError } = useUpcomingMovies();

    if (isActiveLoading || isUpcomingLoading) {
        return <p className="text-center mt-20">Ładowanie filmów...</p>;
    }

    if (activeError || upcomingError) {
        return <p className="text-center mt-20 text-red-500">Błąd wczytywania filmów</p>;
    }

    return (
        <div className="w-full relative">
            <HeroSlider movies={activeMovies} />

            <ContentWrapper>
                <MovieCarousel title="Aktualnie w kinie" movies={activeMovies} />
            </ContentWrapper>
            <ContentWrapper>
                <MovieCarousel title="Wkrótce w kinie" movies={upcomingMovies} isUpcoming />
            </ContentWrapper>
        </div>
    );
};

export default HomePage;
