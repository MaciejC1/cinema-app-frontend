import { useUpcomingMovies } from "../api/hooks/movieQueries";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import ErrorLoading from "../components/loading_components/ErrorLoading";
import UpcomingMovieCard from "../components/cards/Upcomingmoviecard";

const SoonPage = () => {
    const { data: upcomingMovies, isLoading: isUpcomingLoading, error: upcomingError } = useUpcomingMovies();

    if (isUpcomingLoading) {
        return <LoadingSpinner text="Ładowanie filmów.." />;
    }

    if (upcomingError) {
        return <ErrorLoading text="Błąd ładowania filmów" />;
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-[1500px] mx-auto">
                <div className="mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl text-center md:text-6xl font-bold mb-3 bg-linear-to-r text-primary bg-clip-text">
                        Wkrótce w kinach
                    </h1>
                    <p className="text-center text-lg">
                        Odkryj nadchodzące premiery filmowe
                    </p>
                </div>

                {upcomingMovies && upcomingMovies.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {upcomingMovies.map((movie) => (
                            <UpcomingMovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl">
                            Brak nadchodzących filmów
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SoonPage;