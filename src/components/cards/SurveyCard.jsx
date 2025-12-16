import { Star } from "lucide-react";
import { useState } from "react";

const SurveyCard = ({ movie, rating, onRate }) => {
  const [hover, setHover] = useState(null);

  return (
    <div
      className={`
        rounded-xl p-2 flex flex-col items-center border-1 
        ${rating ? "border-primary" : "border-[#404040]"}
        bg-[#0D0D0D] transition-all
      `}
    >
      <div className="w-full aspect-2/3 rounded-lg overflow-hidden bg-[#111111]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="mt-2 text-sm text-center line-clamp-2">
        {movie.title}
      </h3>

      <div
        className="flex gap-1 mt-2"
        onMouseLeave={() => setHover(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const active =
            hover !== null ? hover >= star : (rating || 0) >= star;

          return (
            <Star
              key={star}
              size={18}
              onMouseEnter={() => setHover(star)}
              onClick={() => onRate(movie.id, star)}
              className={`
                cursor-pointer transition-all duration-150
                ${active
                  ? "fill-primary text-primary scale-110"
                  : "text-gray-500"}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SurveyCard;
