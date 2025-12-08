import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HeroSlider from "../components/sliders/HeroSlider";
import MovieCarousel from "../components/sliders/MovieCarousel";
import ContentWrapper from "../layouts/ContentWrapper";

import ErrorLoading from "../components/loading_components/ErrorLoading";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";

import { useActiveMovies, useUpcomingMovies } from "../api/hooks/movieQueries";

const HomePage = () => {
    const { data: activeMovies, isLoading: isActiveLoading, error: activeError } = useActiveMovies();
    const { data: upcomingMovies, isLoading: isUpcomingLoading, error: upcomingError } = useUpcomingMovies();

    return (
        <div className="w-full relative">

            {isActiveLoading && (
                <LoadingSpinner text="Ładowanie filmów dnia..." size={48} />
            )}

            {!isActiveLoading && activeError && (
                <ErrorLoading message="Nie udało się załadować filmów dnia" />
            )}

            {!isActiveLoading && !activeError && activeMovies && (
                <HeroSlider movies={activeMovies} />
            )}

            <ContentWrapper>
                {isActiveLoading && (
                    <LoadingSpinner text="Ładowanie filmów w kinach..." />
                )}

                {!isActiveLoading && activeError && (
                    <ErrorLoading message="Nie udało się załadować filmów" />
                )}

                {!isActiveLoading && !activeError && activeMovies && (
                    <MovieCarousel
                        title="Aktualnie w kinie"
                        movies={activeMovies}
                    />
                )}
            </ContentWrapper>

            <ContentWrapper>
                {isUpcomingLoading && (
                    <LoadingSpinner text="Ładowanie nadchodzących premier..." />
                )}

                {!isUpcomingLoading && upcomingError && (
                    <ErrorLoading message="Nie udało się załadować premier" />
                )}

                {!isUpcomingLoading && !upcomingError && upcomingMovies && (
                    <MovieCarousel
                        title="Wkrótce w kinie"
                        movies={upcomingMovies}
                        isUpcoming
                    />
                )}
            </ContentWrapper>

        </div>
    );
};

export default HomePage;
