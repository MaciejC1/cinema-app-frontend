import { Star, Film } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../../layouts/ContentWrapper";

const RatingSection = ({ userRatings, onRatingUpdate }) => {
    const [hoveredRating, setHoveredRating] = useState({});
    const [selectedRating, setSelectedRating] = useState({});

    const handleStarClick = async (movieId, rating) => {
        setSelectedRating({ ...selectedRating, [movieId]: rating });
        await onRatingUpdate(movieId, rating);
    };

    const renderStars = (movieId, currentRating) => {
        const rating = selectedRating[movieId] || currentRating;
        const hovered = hoveredRating[movieId] || 0;

        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onMouseEnter={() => setHoveredRating({ ...hoveredRating, [movieId]: star })}
                        onMouseLeave={() => setHoveredRating({ ...hoveredRating, [movieId]: 0 })}
                        onClick={() => handleStarClick(movieId, star)}
                        className="transition-all duration-200 hover:scale-110"
                    >
                        <Star
                            className={`w-4 h-4 transition-all duration-200 ${
                                star <= (hovered || rating)
                                    ? "fill-primary text-primary cursor-pointer"
                                    : "fill-none text-gray-500 hover:text-gray-400"
                            }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="mb-7">
                <h2 className="text-3xl font-bold mb-2 bg-clip-text">
                    Twoje oceny
                </h2>
                <div className="h-0.5 w-full bg-primary to-transparent rounded-full"></div>
            </div>

            {userRatings && userRatings.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {userRatings.map((item) => (
                        <div
                            key={item.movieMinimalDTO.id}
                            className="group relative bg-[#111111] rounded-lg overflow-hidden hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 border border-zinc-800 hover:border-primary/50"
                        >
                            
                            <div className="relative p-2">
                                <Link
                                    to={`/film/${item.movieMinimalDTO.slug}`}
                                    className="block mb-2"
                                >
                                    <div className="relative overflow-hidden rounded-md mb-2 aspect-2/3 bg-zinc-800">
                                        <img
                                            src={item.movieMinimalDTO.poster}
                                            alt={item.movieMinimalDTO.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    
                                    <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors duration-200 line-clamp-2 min-h-10">
                                        {item.movieMinimalDTO.title}
                                    </h3>
                                </Link>

                                <div className="pt-2 border-t border-zinc-800">
                                    {item.rating === 0 ? (
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">
                                                Oceń
                                            </p>
                                            {renderStars(item.movieMinimalDTO.id, 0)}
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-[10px] tracking-wide">
                                                    OCENA
                                                </p>
                                            </div>
                                            {renderStars(item.movieMinimalDTO.id, item.rating)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-linear-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-zinc-800">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                        <Star className="relative w-20 h-20 text-gray-700 mx-auto" />
                    </div>
                    <p className="text-gray-400 text-xl font-medium mb-2">
                        Nie masz jeszcze żadnych ocen
                    </p>
                    <p className="text-gray-600 text-sm">
                        Zacznij oceniać filmy, aby zobaczyć je tutaj
                    </p>
                </div>
            )}
        </div>
    );
};

export default RatingSection;