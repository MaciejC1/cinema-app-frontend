import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieShowtimesSection = ({ showtimes }) => {
    const [showAllDays, setShowAllDays] = useState(false);
    const navigate = useNavigate();

    const sortedShowtimes = [...showtimes].sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );

    const showtimesByDate = sortedShowtimes.reduce((acc, show) => {
        const dateKey = new Date(show.startTime).toLocaleDateString("pl-PL", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(show);
        return acc;
    }, {});

    const allDates = Object.keys(showtimesByDate);
    const datesToShow = showAllDays ? allDates : allDates.slice(0, 4);

    return (
        <div className="flex flex-col gap-4 mt-4">
            {datesToShow.map((date) => (
                <div key={date} className="flex flex-col gap-2">
                    <h3 className="text-white text-2xl">{date}</h3>

                    <div className="bg-[#111111] p-4 rounded-xl flex flex-wrap gap-2">
                        {showtimesByDate[date].map((show) => (
                            <div
                                key={show.id}
                                onClick={() =>
                                    navigate(`/rezerwacja/${show.id}`, {
                                        state: {
                                            showtime: show
                                        }
                                    })
                                }
                                className="bg-[#111111] border-2 border-primary
                                           text-white w-40 py-4 flex flex-col
                                           items-center justify-center rounded-lg
                                           cursor-pointer hover:bg-primary
                                           hover:border-white transition-colors duration-200"
                            >
                                <span className="text-2xl">
                                    {new Date(show.startTime).toLocaleTimeString("pl-PL", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>

                                <span className="text-sm mt-1">
                                    {show.hasSubtitles ? "Napisy" : show.audioTrack}
                                </span>

                                <span className="text-sm mt-1">
                                    {show.is3d ? "3D" : "2D"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {allDates.length > 4 && (
                <button
                    onClick={() => setShowAllDays(prev => !prev)}
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-xl
                               flex items-center justify-center gap-2
                               transition-all duration-300 ease-out
                               hover:brightness-125 hover:shadow-[0_0_20px_#DF2144aa]
                               cursor-pointer"
                >
                    <Plus
                        size={18}
                        className={`transition-transform ${showAllDays ? "rotate-45" : ""}`}
                    />
                    {showAllDays ? "Pokaż mniej" : "Pokaż więcej dni"}
                </button>
            )}
        </div>
    );
};

export default MovieShowtimesSection;
