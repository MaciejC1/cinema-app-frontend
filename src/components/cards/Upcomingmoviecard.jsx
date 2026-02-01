import { Link } from "react-router-dom";
import { Star, Clock, Calendar, ArrowRight } from "lucide-react";

const UpcomingMovieCard = ({ movie }) => {
    return (
        <Link
            to={`/film/${movie.slug}`}
            className="group"
        >
            <div className="relative bg-linear-to-br from-black/90 via-black/70 to-black/90 backdrop-blur-sm border border-[#791225]/50 rounded-3xl overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1">
                <div className="absolute inset-0 bg-linear-to-r from-[#791225]/0 via-primary/5 to-[#791225]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-56 md:w-56 shrink-0">
                        <div className="aspect-2/3 overflow-hidden">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />

                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black/80 sm:to-black/90"></div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        <div className="absolute top-5 left-5 bg-linear-to-r from-primary to-[#AC1934] backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-primary/50">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-white" />
                                <span className="text-white text-sm font-bold tracking-wide">WKRÓTCE</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-linear-to-r from-white via-white to-white bg-clip-text text-transparent transition-all duration-500">
                                {movie.title}
                            </h2>

                            <div className="flex flex-wrap items-center gap-6 mb-6">
                                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-[#791225]/50">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="text-base text-white font-medium">{movie.durationMinutes} min</span>
                                </div>

                                {movie.averageRating > 0 && (
                                    <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-[#791225]/50">
                                        <Star className="w-5 h-5 fill-primary text-primary" />
                                        <span className="text-base text-white font-medium">{movie.averageRating.toFixed(1)}</span>
                                        <span className="text-sm text-gray-400">/ 5.0</span>
                                    </div>
                                )}
                            </div>

                            {movie.description && (
                                <p className="text-gray-300 text-lg leading-relaxed line-clamp-3 mb-6">
                                    {movie.description}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3 text-primary font-semibold text-lg group-hover:gap-5 transition-all duration-300">
                            <span>Zobacz szczegóły</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </Link>
    );
};

export default UpcomingMovieCard;