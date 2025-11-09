import { useState } from "react";
import { Clock, Popcorn, Play, X } from "lucide-react";
import { TiStarFullOutline } from "react-icons/ti";
import ContentWrapper from "../layouts/ContentWrapper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const MovieDetailsPage = () => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const movie = {
        title: "Until Dawn",
        description: "W rocznicę zaginięcia siostry, Clover wraz z przyjaciółmi wybiera się w to samo miejsce. Tam ściga ich morderca, a każdy poranek zaczyna się od nowa.",
        description2: "Rok po tajemniczym zniknięciu swojej siostry Melanie, Clover i jej przyjaciele udają się do odległej doliny, w której zniknęła, w poszukiwaniu odpowiedzi. Przeszukując opuszczone centrum dla zwiedzających, odkrywają, że są prześladowani przez zamaskowanego zabójcę i mordowani jeden po drugim... tylko po to, aby obudzić się i znaleźć się z powrotem na początku tego samego wieczoru.",
        image: "https://image.tmdb.org/t/p/original/opSyE1w2QzskFAko0JHtiSrBY6e.jpg",
        director: "David F. Sandberg",
        duration: "1h 48min",
        rating: 5,
        geners: ["Action", "Horror"],
        versions: ["Napisy", "Lektor"],
        slug: "until-dawn",
        ageRating: "18",
        trailer: "https://www.youtube.com/embed/2b3vBaINZ7w",
        thumbnailImage: "https://img.youtube.com/vi/2b3vBaINZ7w/maxresdefault.jpg",
        country: "USA",
        data: "20.06.2025",
        stills: [
            "https://image.tmdb.org/t/p/original/z5gEVVNjvCbz3lT33fnQNYgQKak.jpg",
            "https://image.tmdb.org/t/p/original/17096PNx8qZYraGSuk9gHVgoBxT.jpg",
            "https://image.tmdb.org/t/p/original/o5knWwm1fxCugG5a6saGeqL1tN7.jpg",
            "https://image.tmdb.org/t/p/original/yXtLWhGvvP2csO7iwlUXl3TtjPt.jpg",
            "https://image.tmdb.org/t/p/original/hJeMG7MXsgiAihv1EmMA8zj3L34.jpg"
        ]
    };

    return (
        <div className="w-full relative">
            <div className="w-full flex justify-center overflow-hidden bg-black">
                <div className="w-full max-w-[1920px] aspect-16/8 relative">
                    <div className="w-full relative">
                        <div className="relative w-full h-full">
                            {/* Obraz filmu */}
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover object-center"
                            />

                            {/* Gradienty */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-linear-to-r from-black to-transparent"></div>

                            {/* Tekst i Trailer Thumbnail */}
                            <div className="absolute top-[20%] left-[5%] right-[5%] md:top-[20%] md:left-[5%] md:right-[5%] flex flex-col md:flex-row gap-6 text-white justify-between items-center">
                                {/* Lewa kolumna - opis filmu */}
                                <div className="flex flex-col gap-2 md:w-2/5">
                                    <h2 className="text-[clamp(1.5rem,4vw,3rem)]">{movie.title}</h2>
                                    <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-primary">{movie.director}</p>
                                    <p className="text-[clamp(0.875rem,2vw,1.25rem)]">{movie.description}</p>

                                    {/* Czas i ocena */}
                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <Clock size={20} />
                                            <p className="text-primary">{movie.duration}</p>
                                        </div>
                                        {movie.ageRating && (
                                            <div className="flex items-center gap-2 bg-black border-primary border-2 px-2 py-[2px] rounded-2xl text-sm">
                                                <span className="font-semibold">{movie.ageRating}+</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, idx) =>
                                                idx < movie.rating ? (
                                                    <TiStarFullOutline key={idx} className="text-primary" size={20} />
                                                ) : (
                                                    <TiStarFullOutline key={idx} className="text-[#ACACAC]" size={20} />
                                                )
                                            )}
                                            <span className="text-sm text-[#ACACAC]">(222)</span>
                                        </div>
                                    </div>

                                    {/* Gatunki */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {movie.geners.map((genre, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-black border-2 border-primary text-white px-2 py-1 rounded-full text-xs sm:text-sm"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Wersje */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {movie.versions.map((version, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-black border-2 border-white text-white px-2 py-1 rounded-full text-xs sm:text-sm"
                                            >
                                                {version}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        className="mt-4 flex items-center justify-center gap-2
                                w-1/2 px-4 py-3 text-xl rounded-3xl text-white
                                bg-gradient-to-r from-[#791225] via-[#AC1934] to-primary
                                transition-all duration-300 ease-out hover:brightness-125 hover:shadow-[0_0_20px_#DF2144aa] cursor-pointer">
                                        <span>Kup bilet</span>
                                        <Popcorn size={24} />
                                    </button>
                                </div>

                                {/* Prawa kolumna - trailer thumbnail */}
                                <div className="md:w-3/5 flex items-center justify-center">
                                    <div
                                        className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl relative cursor-pointer group"
                                        onClick={() => setIsTrailerOpen(true)}
                                    >
                                        {/* Thumbnail */}
                                        <img
                                            src={movie.thumbnailImage}
                                            alt="Trailer thumbnail"
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Ciemne tło */}
                                        <div className="absolute inset-0 bg-black/50 group-hover:bg-opacity-40 transition-all duration-300"></div>

                                        {/* Przycisk Play */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                                                <Play size={40} fill="white" className="text-white ml-1" />
                                            </div>
                                        </div>

                                        {/* Tekst "Zobacz trailer" */}
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
                            {/* Przycisk zamknięcia */}
                            <button
                                onClick={() => setIsTrailerOpen(false)}
                                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors duration-200"
                            >
                                <X size={40} />
                            </button>

                            {/* Iframe z trailerem */}
                            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-primary shadow-2xl">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`${movie.trailer}?autoplay=1`}
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
                    <p className="text-[clamp(0.875rem,2vw,1.25rem)] w-3/4">{movie.description2}</p>

                    <div className="flex items-center justify-start gap-x-10 mt-10">
                        {/* Lewa kolumna */}
                        <div className="flex flex-col gap-1 text-[clamp(0.875rem,2vw,1.25rem)] pr-6">
                            <div className="flex">
                                <span className="text-primary w-[150px]">Pełny tytuł:</span>
                                <span>{movie.title}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-[150px]">Data premiery:</span>
                                <span>{movie.data}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-[150px]">Reżyser:</span>
                                <span>{movie.director}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-[150px]">Kraj produkcji:</span>
                                <span>{movie.country}</span>
                            </div>
                        </div>

                        {/* Pionowa linia */}
                        <div className="w-0.5 bg-white h-32"></div>

                        {/* Prawa kolumna */}
                        <div className="flex flex-col gap-1 text-[clamp(0.875rem,2vw,1.25rem)]">
                            <div className="flex">
                                <span className="text-primary w-56">Gatunek:</span>
                                <span>{movie.geners.join(", ")}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-56">Dostępne wersje:</span>
                                <span>{movie.versions.join(", ")}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-56">Czas trwania filmu:</span>
                                <span>{movie.duration}</span>
                            </div>
                            <div className="flex">
                                <span className="text-primary w-56">Ograniczenie wiekowe:</span>
                                <span>{movie.ageRating}+</span>
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
                            {movie.stills.map((image, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="overflow-hidden rounded-xl shadow-lg group aspect-video">
                                        <img
                                            src={image}
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
        </div>
    );
};

export default MovieDetailsPage;