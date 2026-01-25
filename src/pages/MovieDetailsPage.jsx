import { useState, useEffect } from "react";
import { Clock, Popcorn, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { TiStarFullOutline } from "react-icons/ti";
import ContentWrapper from "../layouts/ContentWrapper";
import { useMovieBySlug } from "../api/hooks/movieQueries";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { formatDuration } from "../utils/format";
import { useCinema } from "../context/CinemaContext";
import { useAuth } from "../context/AuthContext";
import { useUserMatchToMovie, useUserPreferenceStatus } from "../api/hooks/userQueries";
import { useMovieShowtimes } from "../api/hooks/movieQueries";
import MovieShowtimesSection from "../components/sections/MovieShowtimesSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import ErrorLoading from "../components/loading_components/ErrorLoading";

const MovieDetailsPage = () => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const { cinema } = useCinema();
    const { user, isAuthenticated } = useAuth();
    const { slug } = useParams();
    const { data: movie, isLoading, isError } = useMovieBySlug(slug);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#seanse") {
            setTimeout(() => {
                const el = document.getElementById("seanse");
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }, [location.hash]);


    const {
        data: preferenceStatus,
        isLoading: preferenceLoading
    } = useUserPreferenceStatus(isAuthenticated);

    const {
        data: userMatch,
        isLoading: matchLoading
    } = useUserMatchToMovie(
        user?.userId,
        movie?.id,
        isAuthenticated && preferenceStatus?.hasPreferences
    );

    const {
        data: showtimes,
        isLoading: showtimesLoading,
        isError: showtimesError
    } = useMovieShowtimes(slug, cinema?.id);

    if (isLoading || showtimesLoading || !cinema) {
        return (
            <LoadingSpinner
                text="Ładowanie szczegółów filmu..."
                size={60}
            />
        );
    }

    if (isError || showtimesError || !movie) {
        return (
            <ErrorLoading message="Nie udało się załadować danych filmu" />
        );
    }

    const backdrop = movie.media?.find(m => m.mediaType === "backdrop");
    const trailer = movie.media?.find(m => m.mediaType === "trailer");
    const thumbnailImage = movie.media?.find(m => m.mediaType === "trailer_thumbnail");
    const galleryImages = movie.media?.filter(m => m.mediaType === "still") || [];

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === galleryImages.length - 1 ? 0 : prev + 1
        );
    };


    return (
        <div className="w-full relative">
            <div className="w-full flex justify-center overflow-hidden bg-black">
                <div className="w-full max-w-[1920px] aspect-16/8 relative">
                    <div className="w-full relative">
                        <div className="relative w-full h-full">

                            <img
                                src={backdrop?.url}
                                alt={movie.title}
                                className="w-full h-full object-cover object-center"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-linear-to-r from-black to-transparent"></div>

                            <div className="absolute top-[20%] left-[5%] right-[5%] md:top-[20%] md:left-[5%] md:right-[5%] flex flex-col md:flex-row gap-6 text-white justify-between items-center">
                                <div className="flex flex-col gap-2 md:w-2/5">
                                    <h2 className="text-[clamp(1.5rem,4vw,3rem)]">{movie.title}</h2>
                                    <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-primary">{movie.directors}</p>
                                    <p className="text-[clamp(0.875rem,2vw,1.25rem)] line-clamp-4">{movie.description}</p>

                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <Clock size={20} />
                                            <p className="text-primary">{formatDuration(movie.durationMinutes)}</p>
                                        </div>
                                        {movie.ageRating && (
                                            <div className="flex items-center gap-2 bg-black border-primary border-2 px-2 py-[2px] rounded-2xl text-sm">
                                                <span className="font-semibold">{movie.ageRating}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, idx) =>
                                                idx < movie.averageRating ? (
                                                    <TiStarFullOutline key={idx} className="text-primary" size={20} />
                                                ) : (
                                                    <TiStarFullOutline key={idx} className="text-[#ACACAC]" size={20} />
                                                )
                                            )}
                                            <span className="text-sm text-[#ACACAC]">({movie.ratingCount})</span>
                                        </div>
                                    </div>

                                    {/* Gatunki */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {movie.genres?.map((genre, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-black border-2 border-primary text-white px-2 py-1 rounded-full text-xs sm:text-sm"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>


                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {movie.hasSubtitles && (
                                            <span className="bg-black border-2 border-white text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                                                Napisy
                                            </span>
                                        )}
                                        {movie.hasLector && (
                                            <span className="bg-black border-2 border-white text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                                                Lektor
                                            </span>
                                        )}
                                        {movie.hasDubbing && (
                                            <span className="bg-black border-2 border-white text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                                                Dubbing
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => navigate(`/film/${slug}#seanse`)}
                                        className="mt-4 flex items-center justify-center gap-2
                                w-1/2 px-4 py-3 text-xl rounded-3xl text-white
                                bg-gradient-to-r from-[#791225] via-[#AC1934] to-primary
                                transition-all duration-300 ease-out hover:brightness-125 hover:shadow-[0_0_20px_#DF2144aa] cursor-pointer">
                                        <span>Kup bilet</span>
                                        <Popcorn size={24} />
                                    </button>

                                    {/* Informacje o dopasowaniu użytkownika */}
                                    {isAuthenticated && !preferenceLoading && (
                                        <div className="rounded-xl text-primary">
                                            {preferenceStatus?.hasPreferences ? (
                                                userMatch ? (
                                                    <span>
                                                        Ten film jest zgodny z Twoimi upodobaniami w {userMatch.similarityNormalizedPercentage}
                                                    </span>
                                                ) : (
                                                    <span>Ładowanie dopasowania...</span>
                                                )
                                            ) : (
                                                <span>
                                                    Aby otrzymać rekomendacje, wypełnij ankietę preferencji.
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="md:w-3/5 flex items-center justify-center">
                                    <div
                                        className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl relative cursor-pointer group"
                                        onClick={() => setIsTrailerOpen(true)}
                                    >
                                        <img
                                            src={thumbnailImage.url}
                                            alt="Trailer thumbnail"
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/50 group-hover:bg-opacity-40 transition-all duration-300"></div>

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                                                <Play size={40} fill="white" className="text-white ml-1" />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                                            Zobacz trailer
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal z trailerem */}
                {isTrailerOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsTrailerOpen(false)}
                    >
                        <div
                            className="relative w-full max-w-5xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsTrailerOpen(false)}
                                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors duration-200 cursor-pointer"
                            >
                                <X size={40} />
                            </button>

                            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-primary shadow-2xl">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`${trailer.url}?autoplay=1`}
                                    title="Movie Trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            <ContentWrapper>
                <div className="flex flex-col">
                    <span className="text-[clamp(1.5rem,4vw,3rem)]"> Więcej informacji o filmie</span>
                    <p className="text-[clamp(0.875rem,2vw,1.25rem)] w-3/4">{movie.description}</p>

                    <div className="flex items-center justify-start gap-x-10 mt-10">
                        <div className="flex flex-col gap-1 text-[clamp(0.875rem,2vw,1.25rem)] pr-6">
                            <div className="flex">
                                <span className="text-primary w-[150px]">Pełny tytuł:</span>
                                <span>{movie.title}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-[150px]">Data premiery:</span>
                                <span>{movie.releaseDate}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-[150px]">Reżyser:</span>
                                <span>{movie.directors}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-[150px]">Kraj produkcji:</span>
                                <span>{movie.country}</span>
                            </div>
                        </div>

                        <div className="w-0.5 bg-white h-32"></div>

                        <div className="flex flex-col gap-1 text-[clamp(0.875rem,2vw,1.25rem)]">
                            <div className="flex">
                                <span className="text-primary w-56">Gatunek:</span>
                                <span>{movie.genres.join(", ")}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-56">Dostępne wersje:</span>
                                <span>
                                    {[
                                        movie.hasDubbing && "Dubbing",
                                        movie.hasLector && "Lektor",
                                        movie.hasSubtitles && "Napisy"
                                    ]
                                        .filter(Boolean)
                                        .join(", ")}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-56">Czas trwania filmu:</span>
                                <span>{formatDuration(movie.durationMinutes)}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-56">Ograniczenie wiekowe:</span>
                                <span>{movie.ageRating}</span>
                            </div>
                        </div>
                    </div>

                    {/* Karuzela zdjęć z filmu */}
                    <div className="mt-16">
                        <h2 className="text-[clamp(1.25rem,3vw,2rem)] mb-4">Galeria z filmu</h2>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={1.2}
                            breakpoints={{
                                640: { slidesPerView: 2.2 },
                                1024: { slidesPerView: 3.2 },
                                1440: { slidesPerView: 4.2 },
                            }}
                            navigation
                            loop={true}
                            pagination={false}
                            className="rounded-2xl"
                        >
                            {movie.media
                                .filter((item) => item.mediaType === "still")
                                .map((image, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="overflow-hidden rounded-xl shadow-lg group aspect-video cursor-pointer" onClick={() => setSelectedImageIndex(idx)}>
                                            <img
                                                src={image.url}
                                                alt={`Kadr ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>

            </ContentWrapper>

            <ContentWrapper>
                <div className="mt-8" id="seanse" >
                    <span className="text-[clamp(1.5rem,4vw,3rem)] flex gap-x-2">
                        Seanse dostępne w kinie:
                        <span className="text-primary">{cinema?.name}</span>
                    </span>

                    {showtimes?.showtimes?.length > 0 && (
                        <MovieShowtimesSection showtimes={showtimes.showtimes} />
                    )}
                </div>
            </ContentWrapper>


            {selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <div
                        className="relative w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImageIndex(null)}
                            className="absolute top-4 right-4 text-white hover:text-primary transition-colors duration-200 z-10 cursor-pointer"
                        >
                            <X size={40} />
                        </button>

                        <button
                            onClick={handlePrevImage}
                            className="absolute left-4 text-white hover:text-primary transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 cursor-pointer"
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <img
                            src={galleryImages[selectedImageIndex]?.url}
                            alt={`Kadr ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                        />

                        <button
                            onClick={handleNextImage}
                            className="absolute right-4 text-white hover:text-primary transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 cursor-pointer"
                        >
                            <ChevronRight size={40} />
                        </button>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
                            {selectedImageIndex + 1} / {galleryImages.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetailsPage;