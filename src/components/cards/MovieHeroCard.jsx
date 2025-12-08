import { motion } from "framer-motion";
import { Clock, ArrowRight, Popcorn } from "lucide-react";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { formatDuration } from "../../utils/format";

const MovieHeroCard = ({ title, description, image, director, duration, rating, geners, ageRating, slug, isActive }) => {
    return (
        <div className="relative w-full h-full">

            {/* Obraz filmu */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center"
            />

            {/* Gradienty */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-linear-to-r from-black to-transparent"></div>

            {/* Tekst */}
            <motion.div
                className="absolute top-[20%] left-[5%] md:top-[25%] md:left-[5%] w-[90%] md:w-2/5 flex flex-col gap-2 text-white"
                initial={{ opacity: 0, x: -100 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <h2 className="text-[clamp(1.5rem,4vw,3rem)]">{title}</h2>
                <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-primary">{director}</p>
                <p className="text-[clamp(0.875rem,2vw,1.25rem)] line-clamp-4">{description}</p>

                {/* Czas i ocena */}
                <div className="flex flex-wrap items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                        <Clock size={20} />
                        <p className="text-primary">{formatDuration(duration)}</p>
                    </div>
                    {ageRating && (
                        <div className="flex items-center gap-2 bg-black border-primary border-2 px-2 py-[2px] rounded-2xl text-sm">
                            <span className="font-semibold">{ageRating}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) =>
                            idx < rating ? (
                                <TiStarFullOutline key={idx} className="text-primary" size={20} />
                            ) : (
                                <TiStarFullOutline key={idx} className="text-[#ACACAC]" size={20} />
                            )
                        )}
                    </div>
                </div>

                {/* Gatunki */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {geners.map((genre, idx) => (
                        <span
                            key={idx}
                            className="bg-black border-2 border-primary text-white px-2 py-1 rounded-full text-xs sm:text-sm"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Zobacz więcej */}
                <div className="mt-2">
                    <Link to={`/film/${slug}`}
                        className="inline-flex items-center gap-2 text-white text-sm sm:text-base md:text-xl border-b-2 border-white hover:border-primary transition-all"
                    >
                        <span>Zobacz więcej</span>
                        <ArrowRight size={16} className="sm:18 md:20" />
                    </Link>
                </div>

                <button
                    className="mt-4 flex items-center justify-center gap-2
                            w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4 py-3 text-xl rounded-3xl text-white
                            bg-linear-to-r from-[#791225] via-[#AC1934] to-primary
                            transition-all duration-300 ease-out hover:brightness-125 hover:shadow-[0_0_20px_#DF2144aa] cursor-pointer">
                    <span>Kup bilet</span>
                    <Popcorn size={24} />
                </button> 
            </motion.div>
        </div>
    
    );
};


export default MovieHeroCard;
