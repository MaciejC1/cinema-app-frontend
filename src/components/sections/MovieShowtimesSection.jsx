import { useState } from "react";
import { Plus } from "lucide-react";

const MovieShowtimesSection = ({ showtimes }) => {
    const [showAllDays, setShowAllDays] = useState(false);

    const showtimesByDate = showtimes.reduce((acc, show) => {
        const date = new Date(show.startTime).toLocaleDateString("pl-PL", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(show);
        return acc;
    }, {});

    const allDates = Object.keys(showtimesByDate);
    const datesToShow = showAllDays ? allDates : allDates.slice(0, 4);

    return (
        <div className="flex flex-col gap-4 mt-4">
            {datesToShow.map((date) => (
                <div key={date} className="flex flex-col gap-2">
                    <h3 className="text-white text-2xl">{date}</h3>

                    {/* Prostokąt z kartami seansów */}
                    <div className="bg-[#111111] p-4 rounded-xl flex flex-wrap gap-2">
                        {showtimesByDate[date].map((show) => (
                            <div
                                key={show.id}
                                className="bg-[#111111] border-2 border-primary text-white w-30 h-auto py-4 flex flex-col items-center justify-center rounded-lg cursor-pointer"
                            >
                                {/* Godzina */}
                                <span className="text-2xl">
                                    {new Date(show.startTime).toLocaleTimeString("pl-PL", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>

                                {/* 2D / 3D */}
                                <span className="text-sm mt-1">
                                    {show.is3d ? "3D" : "2D"}
                                </span>

                                {/* Subtitles */}
                                {show.subtitles && (
                                    <span className="text-sm mt-1">
                                        Napisy
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {allDates.length > 4 && !showAllDays &&(
                <button
                    onClick={() => setShowAllDays(true)}
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:brightness-125 hover:shadow-[0_0_20px_#DF2144aa] cursor-pointer"
                >
                    <Plus size={18} />
                    Pokaż więcej dni
                </button>
            )}
        </div>
    );
};

export default MovieShowtimesSection;
