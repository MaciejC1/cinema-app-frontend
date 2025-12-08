import { TiStarFullOutline } from "react-icons/ti";
import { Clock, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/format";

const MovieSmallCard = ({ title, rating, duration, image, releaseDate, slug, isUpcoming }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/film/${slug}`);
    };

    return (
        <div onClick={handleClick}
            className="group cursor-pointer bg-[#111111] border border-[#404040] rounded-lg overflow-hidden p-1 transition-all duration-300 hover:brightness-110 hover:border-primary">

            <div className="rounded-lg overflow-hidden aspect-2/3 w-full bg-[#1a1a1a]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
            </div>

            <div className="mt-2 px-2">

                <h3 className="text-lg leading-tight line-clamp-1">
                    {title}
                </h3>

                <div className="flex items-center justify-between mt-8 text-lg">
                    <div className="flex items-center gap-1">
                        <Clock />
                        <span className="text-primary">{formatDuration(duration)}</span>
                    </div>

                    {isUpcoming ? (
                        <div className="flex items-center gap-1 text-base">
                            <span>{releaseDate}</span>
                            <CalendarDays color="#DF2144" size={20} />
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <span>{rating}</span>
                            <TiStarFullOutline color="#DF2144" size={20} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MovieSmallCard;
