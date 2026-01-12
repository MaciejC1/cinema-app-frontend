import ContentWrapper from "../layouts/ContentWrapper";
import { useAuth } from "../context/AuthContext";
import { useUserPreferenceGenres, useUserMatchToMovies } from "../api/hooks/userQueries";
import { useActiveMovies } from "../api/hooks/movieQueries";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";

const RecommendationPage = () => {
    const { user } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: genres, isLoading: genresLoading } = useUserPreferenceGenres(true);
    const { data: matchData, isLoading: matchLoading } = useUserMatchToMovies(user?.userId);
    const { data: activeMovies, isLoading: moviesLoading } = useActiveMovies();

    const recommendedMovies = useMemo(() => {
        if (!matchData || !activeMovies) return [];

        return matchData
            .map(match => {
                const movie = activeMovies.find(m => m.title === match.movieTitle);
                if (!movie) return null;

                return {
                    id: movie.id,
                    title: movie.title,
                    director: movie.directors.join(", "),
                    image: movie.backdrop || movie.poster,
                    description: movie.description,
                    genres: movie.genres,
                    durationMinutes: movie.durationMinutes,
                    ageRating: movie.ageRating,
                    slug: movie.slug,
                    system1: {
                        similarityScore: match.similarityScore,
                        similarityPercentage: match.similarityPercentage,
                        similarityNormalized: match.similarityNormalized,
                        similarityNormalizedPercentage: match.similarityNormalizedPercentage
                    },
                    system2: {
                        similarityScore: "-",
                        similarityPercentage: "-",
                        similarityNormalized: "-",
                        similarityNormalizedPercentage: "-"
                    }
                };
            })
            .filter(Boolean);
    }, [matchData, activeMovies]);

    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? recommendedMovies.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === recommendedMovies.length - 1 ? 0 : prev + 1
        );
    };

    const isLoading = genresLoading || matchLoading || moviesLoading;
    const currentMovie = recommendedMovies[currentIndex];

    if (isLoading) {
        return (
            <ContentWrapper>
                <div className="mt-28 flex items-center justify-center">
                    <div className="text-xl text-gray-400">Ładowanie rekomendacji...</div>
                </div>
            </ContentWrapper>
        );
    }

    if (!recommendedMovies.length) {
        return (
            <ContentWrapper>
                <div className="mt-28 flex items-center justify-center">
                    <div className="text-xl text-gray-400">Brak dostępnych rekomendacji</div>
                </div>
            </ContentWrapper>
        );
    }

    return (
        <ContentWrapper>
            <div className="mt-28 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="bg-black border-2 border-primary rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-lg shadow-primary/20">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles size={32} className="text-primary" />
                    </div>

                    <div className="text-center">
                        <span className="block text-xl font-semibold">
                            {user?.lastName} {user?.name}
                        </span>
                        <span className="text-primary text-lg">
                            Profil rekomendacji
                        </span>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-black border-2 border-primary rounded-2xl p-6 shadow-lg shadow-primary/20">
                    <h2 className="text-2xl mb-6 text-center">Twoje ulubione gatunki</h2>

                    <div className="w-full h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={genres || []}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="genre" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    dataKey="value"
                                    stroke="#DF2144"
                                    fill="#DF2144"
                                    fillOpacity={0.5}
                                    isAnimationActive={false}
                                    activeDot={false}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-black border-2 border-primary rounded-2xl p-6 shadow-lg shadow-primary/20">
                <h2 className="text-2xl mb-6 text-center">Filmy z repertuaru z oceną dopasowania</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                            src={currentMovie.image}
                            alt={currentMovie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">{currentMovie.title}</h3>
                            <p className="mb-6">Reżyseria: {currentMovie.director}</p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-primary mb-3">System Rekomendacyjny 1</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-primary/10 rounded-lg p-3">
                                            <p className="text-sm text-gray-400">Dopasowanie</p>
                                            <p className="text-xl font-semibold">{currentMovie.system1.similarityPercentage}</p>
                                        </div>
                                        <div className="bg-primary/10 rounded-lg p-3">
                                            <p className="text-sm text-gray-400">Dopasowanie Znormalizowane</p>
                                            <p className="text-xl font-semibold">{currentMovie.system1.similarityNormalizedPercentage}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-primary mb-3">System Rekomendacyjny 2</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-primary/10 rounded-lg p-3">
                                            <p className="text-sm text-gray-400">Dopasowanie</p>
                                            <p className="text-xl font-semibold">{currentMovie.system2.similarityPercentage}</p>
                                        </div>
                                        <div className="bg-primary/10 rounded-lg p-3">
                                            <p className="text-sm text-gray-400">Dopasowanie Znormalizowane</p>
                                            <p className="text-xl font-semibold">{currentMovie.system2.similarityNormalizedPercentage}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-primary/30">
                            <button
                                onClick={handlePrevious}
                                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                            >
                                <ChevronLeft size={20} />
                                Poprzedni
                            </button>

                            <span className="text-gray-400">
                                {currentIndex + 1} / {recommendedMovies.length}
                            </span>

                            <button
                                onClick={handleNext}
                                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                            >
                                Następny
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ContentWrapper>
    );
};

export default RecommendationPage;