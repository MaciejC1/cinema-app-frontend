import ContentWrapper from "../layouts/ContentWrapper";
import { useAuth } from "../context/AuthContext";
import { useUserPreferenceGenres, useUserMatchToMovies, useAIRecommendationMutation, useUserMatchToMoviesCF } from "../api/hooks/userQueries";
import { useActiveMovies } from "../api/hooks/movieQueries";
import { Sparkles, ChevronLeft, ChevronRight, X, Star, Clock, Calendar } from "lucide-react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { useState, useMemo, useEffect } from "react";

const RecommendationPage = () => {
    const { user } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAIDialog, setShowAIDialog] = useState(false);
    const [aiCurrentIndex, setAiCurrentIndex] = useState(0);

    const { data: genres, isLoading: genresLoading } = useUserPreferenceGenres(true);
    const { data: matchData, isLoading: matchLoading } = useUserMatchToMovies(user?.userId);
    const { data: matchDataCF, isLoading: matchLoadingCF } = useUserMatchToMoviesCF(user?.userId);
    const { data: activeMovies, isLoading: moviesLoading } = useActiveMovies();
    const { mutate: fetchAIRecommendation, data: aiRecommendations, isPending: aiLoading } = useAIRecommendationMutation();

    const handleOpenAIDialog = () => {
        setShowAIDialog(true);
        if (!aiRecommendations) {
            fetchAIRecommendation();
        }
    };

    const recommendedMovies = useMemo(() => {
        if (!matchData || !activeMovies) return [];

        return matchData
            .map(match => {
                if (!activeMovies) return null;
                const movie = activeMovies.find(m => m.title === match.movieTitle);
                if (!movie) return null;
                const cfMatch = matchDataCF?.find(cf => cf.movieTitle === movie.title);
                if (!cfMatch) return null;
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
                    system2: cfMatch
                        ? {
                            similarityScore: cfMatch.similarityScore ?? "-",
                            similarityPercentage: cfMatch.similarityPercentage != null ? cfMatch.similarityPercentage : "-",
                            similarityNormalized: cfMatch.similarityNormalized != null ? cfMatch.similarityNormalized : "-",
                            similarityNormalizedPercentage: cfMatch.similarityNormalizedPercentage != null ? cfMatch.similarityNormalizedPercentage : "-"
                        }
                        : {
                            similarityScore: "-",
                            similarityPercentage: "-",
                            similarityNormalized: "-",
                            similarityNormalizedPercentage: "-"
                        }
                };
            })
            .filter(Boolean);
    }, [matchData, activeMovies, matchDataCF]);

    const aiRecommendedMovies = useMemo(() => {
        if (!aiRecommendations || !activeMovies) return [];

        return aiRecommendations
            .map(aiRec => {
                const movie = activeMovies.find(m => m.id === aiRec.movieId);
                if (!movie) return null;

                return {
                    id: movie.id,
                    title: movie.title,
                    director: movie.directors.join(", "),
                    image: movie.backdrop || movie.poster,
                    poster: movie.poster,
                    description: movie.description,
                    genres: movie.genres,
                    durationMinutes: movie.durationMinutes,
                    ageRating: movie.ageRating,
                    slug: movie.slug,
                    matchPercent: aiRec.match_percent,
                    predictedRating: aiRec.predicted_rating
                };
            })
            .filter(Boolean);
    }, [aiRecommendations, activeMovies]);

    const comparisonChartData = useMemo(() => {
        return recommendedMovies.map(movie => {
            const contentBasedValue = parseFloat(movie.system1.similarityNormalizedPercentage);
            const collaborativeValue = typeof movie.system2.similarityNormalizedPercentage === 'string' && 
                                       movie.system2.similarityNormalizedPercentage !== '-'
                ? parseFloat(movie.system2.similarityNormalizedPercentage)
                : 0;

            const shortTitle = movie.title.length > 20 
                ? movie.title.substring(0, 20) + '...' 
                : movie.title;

            return {
                title: shortTitle,
                fullTitle: movie.title,
                contentBased: contentBasedValue,
                collaborative: collaborativeValue
            };
        });
    }, [recommendedMovies]);

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

    const handleAIPrevious = () => {
        setAiCurrentIndex((prev) =>
            prev === 0 ? aiRecommendedMovies.length - 1 : prev - 1
        );
    };

    const handleAINext = () => {
        setAiCurrentIndex((prev) =>
            prev === aiRecommendedMovies.length - 1 ? 0 : prev + 1
        );
    };

    const isLoading = genresLoading || matchLoading || matchLoadingCF || moviesLoading;
    const currentMovie = recommendedMovies[currentIndex];
    const currentAIMovie = aiRecommendedMovies[aiCurrentIndex];

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
                <button
                    onClick={handleOpenAIDialog}
                    className="bg-black border-2 border-primary rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-lg shadow-primary/20 hover:bg-primary/5 transition-colors cursor-pointer"
                >
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
                        <span className="text-sm text-gray-400 mt-1 block">
                            Kliknij, aby zobaczyć rekomendacje AI
                        </span>
                    </div>
                </button>

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
                                    <h4 className="text-lg font-semibold text-primary mb-3">System Rekomendacyjny - Content-Based</h4>
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
                                    <h4 className="text-lg font-semibold text-primary mb-3">System Rekomendacyjny - Collaborative Filtering</h4>
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

            <div className="mt-10 bg-black border-2 border-primary rounded-2xl p-6 shadow-lg shadow-primary/20">
                <h2 className="text-2xl mb-6 text-center">Porównanie systemów rekomendacji - wszystkie filmy</h2>
                <p className="text-center mb-6">
                    Dopasowanie znormalizowane dla wszystkich filmów z repertuaru
                </p>
                
                <div className="w-full h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                            data={comparisonChartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis 
                                dataKey="title" 
                                stroke="#999"
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                tick={{ fill: '#999', fontSize: 12 }}
                                interval={0}
                            />
                            <YAxis 
                                stroke="#999"
                                tick={{ fill: '#999' }}
                                label={{ value: 'Dopasowanie (%)', angle: -90, position: 'insideLeft', fill: '#999' }}
                                domain={[0, 100]}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#1a1a1a', 
                                    border: '1px solid #DF2144',
                                    borderRadius: '8px'
                                }}
                                labelStyle={{ color: '#fff', marginBottom: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value, name) => {
                                    const label = name === 'contentBased' ? 'Content-Based' : 'Collaborative Filtering';
                                    return [`${value}%`, label];
                                }}
                                labelFormatter={(label, payload) => {
                                    if (payload && payload[0]) {
                                        return payload[0].payload.fullTitle;
                                    }
                                    return label;
                                }}
                            />
                            <Legend 
                                wrapperStyle={{ paddingTop: '20px' }}
                                formatter={(value) => {
                                    return value === 'contentBased' ? 'Content-Based' : 'Collaborative Filtering';
                                }}
                            />
                            <Bar 
                                dataKey="contentBased" 
                                fill="#DF2144"
                                radius={[8, 8, 0, 0]}
                                name="contentBased"
                                isAnimationActive={false}  
                            />
                            <Bar 
                                dataKey="collaborative" 
                                fill="#8B1538"
                                radius={[8, 8, 0, 0]}
                                name="collaborative"
                                isAnimationActive={false}  
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#DF2144' }}></div>
                            <h4 className="font-semibold">Content-Based</h4>
                        </div>
                        <p className="text-sm ">
                            Rekomendacje oparte na analizie treści filmu
                        </p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8B1538' }}></div>
                            <h4 className="font-semibold">Collaborative Filtering</h4>
                        </div>
                        <p className="text-sm ">
                            Rekomendacje oparte na preferencjach podobnych użytkowników
                        </p>
                    </div>
                </div>
            </div>

            {showAIDialog && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-linear-to-br from-black via-black to-primary/5 border-2 border-primary rounded-3xl w-full max-w-7xl max-h-[95vh] flex flex-col shadow-2xl shadow-primary/40 overflow-hidden">
               
                        <div className="relative bg-linear-to-r from-primary/20 via-primary/10 to-transparent border-b border-primary/30 p-6 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h2 className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
                                        Rekomendacje AI
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAIDialog(false)}
                                className="w-12 h-12 rounded-xl bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                            {aiLoading ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4">
                                    <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                                    <div className="text-xl text-gray-400">Analizuję Twoje preferencje...</div>
                                </div>
                            ) : !aiRecommendedMovies.length ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                            <Sparkles size={40} className="text-primary/50" />
                                        </div>
                                        <div className="text-2xl text-gray-400">Brak dostępnych rekomendacji AI</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col">
                                    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
 
                                        <div className="relative group">
                                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"></div>
                                            <div className="rounded-2xl overflow-hidden h-[580px] border-2 border-primary/20">
                                                <img
                                                    src={currentAIMovie.poster}
                                                    alt={currentAIMovie.title}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                                />
                                            </div>
                                            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 z-20">
                                                <span className="text-primary font-bold text-lg">#{aiCurrentIndex + 1}</span>
                                            </div>
                                        </div>

                                        <div className="h-[580px] flex flex-col">
                                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                                <h3 className="text-4xl font-semibold mb-2 text-white">
                                                    {currentAIMovie.title}
                                                </h3>
                                                <p className="mb-4 text-lg text-gray-300 flex items-center gap-2">
                                                    Reżyseria: {currentAIMovie.director}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {currentAIMovie.genres.map((genre, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-4 py-2 bg-linear-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full text-sm font-medium hover:from-primary/30 hover:to-primary/20 transition-all"
                                                        >
                                                            {genre}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex gap-6 mb-6 text-sm">
                                                    <div className="flex items-center gap-2 text-gray-400">
                                                        <Clock size={16} className="text-primary" />
                                                        <span>{currentAIMovie.durationMinutes} min</span>
                                                    </div>
                                                    {currentAIMovie.ageRating && (
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <span>{currentAIMovie.ageRating}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="bg-linear-to-br from-primary/5 to-transparent border border-primary/20 rounded-xl p-4 mb-6">
                                                    <p className="text-base leading-relaxed">
                                                        {currentAIMovie.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="shrink-0 pt-6 border-t border-primary/20">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <h4 className="text-xl font-semibold text-primary">Analiza AI</h4>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="relative overflow-hidden bg-linear-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-xl p-5 hover:from-primary/30 hover:via-primary/15 transition-all">
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
                                                        <p className="text-sm mb-2 relative z-10">Dopasowanie</p>
                                                        <div className="flex items-end gap-2 relative z-10">
                                                            <p className="text-5xl font-bold text-primary">{currentAIMovie.matchPercent}</p>
                                                            <p className="text-2xl text-primary/70 mb-1">%</p>
                                                        </div>
                                                    </div>
                                                    <div className="relative overflow-hidden bg-linear-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-xl p-5 hover:from-primary/30 hover:via-primary/15 transition-all">
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
                                                        <p className="text-sm mb-2 relative z-10">Przewidywana ocena</p>
                                                        <div className="flex items-center gap-2 relative z-10">
                                                            <Star size={24} className="text-primary fill-primary" />
                                                            <p className="text-4xl font-bold">{currentAIMovie.predictedRating.toFixed(1)}</p>
                                                            <p className="text-xl text-gray-400">/ 5.0</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-primary/20 mt-6">
                                        <button
                                            onClick={handleAIPrevious}
                                            className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-linear-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 rounded-xl transition-all text-base font-medium border border-primary/30"
                                        >
                                            <ChevronLeft size={20} />
                                            Poprzedni
                                        </button>

                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400 text-lg">
                                                {aiCurrentIndex + 1}
                                            </span>
                                            <div className="w-16 h-1 bg-primary/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary duration-300"
                                                    style={{ width: `${((aiCurrentIndex + 1) / aiRecommendedMovies.length) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-400 text-lg">
                                                {aiRecommendedMovies.length}
                                            </span>
                                        </div>

                                        <button
                                            onClick={handleAINext}
                                            className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-linear-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 rounded-xl transition-all text-base font-medium border border-primary/30"
                                        >
                                            Następny
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </ContentWrapper>
    );
};

export default RecommendationPage;