import { useNavigate } from "react-router-dom";

const RepertoireCard = ({ movieId, title, poster, ageRating, genres, showtimes, slug }) => {
    const navigate = useNavigate();

    const goToMovie = () => {
        navigate(`/film/${slug}`);
    };

    return (
        <div className="flex flex-col lg:flex-row bg-[#0D0D0D] p-4 rounded-2xl gap-6">

            <div onClick={goToMovie} className="rounded-lg overflow-hidden aspect-2/3 w-48 bg-[#1a1a1a] flex-shrink-0 cursor-pointer hover:scale-104 duration-300 transition-all">
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                    <h1 onClick={goToMovie} className="text-xl line-clamp-1 hover:underline cursor-pointer">{title}</h1>

                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre, index) => (
                            <span
                                key={index}
                                className="text-xs px-3 py-1 rounded-full border-2 border-primary text-white"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    {ageRating && (
                        <div className="w-9 h-9 mt-2 rounded-full flex items-center justify-center border-2 border-white text-white text-sm font-semibold">
                            {ageRating}
                        </div>
                    )}
                </div>

                {showtimes?.length > 0 && (
                    <div className="flex flex-wrap lg:flex-col lg:items-start gap-2 mt-4">
                        {showtimes.map((show) => (
                            <div
                                key={show.id}
                                className="
                                    bg-[#111111] border-2 border-primary
                                    text-white w-28 py-2
                                    flex flex-col items-center justify-center
                                    rounded-lg cursor-pointer
                                    hover:bg-primary hover:border-white
                                    transition-colors duration-200
                                "
                            >
                                <span className="text-xl">
                                    {new Date(show.startTime).toLocaleTimeString("pl-PL", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>

                                <span className="text-xs mt-1">
                                    {show.hasSubtitles ? "Napisy" : show.audioTrack}
                                </span>

                                <span className="text-xs mt-1">
                                    {show.is3d ? "3D" : "2D"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default RepertoireCard;
