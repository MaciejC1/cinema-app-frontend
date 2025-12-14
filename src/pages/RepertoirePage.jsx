import ContentWrapper from "../layouts/ContentWrapper";
import Calendar from "../components/calendar/Calendar";
import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { formatDateToISO } from "../utils/format";
import { useMoviesWithShowtimes } from "../api/hooks/movieQueries";
import { useCinema } from "../context/CinemaContext";
import ErrorLoading from "../components/loading_components/ErrorLoading";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import RepertoireCard from "../components/cards/RepertoireCard";

const RepertoirePage = () => {
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [customDate, setCustomDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const buttonRef = useRef(null);
  const calendarRef = useRef(null);
  const { cinema } = useCinema();
  const cinemaId = cinema?.id;

  useEffect(() => {
    const days = [];
    const today = new Date();
    const dayShortNames = ["Nd", "Pn", "Wt", "Śr", "Czw", "Pt", "Sb"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        name: i === 0 ? "Dziś" : i === 1 ? "Jutro" : dayShortNames[date.getDay()],
        date: date.toLocaleDateString("pl-PL", { day: "numeric", month: "numeric" }),
        fullDate: date,
      });
    }
    setWeekDays(days);
  }, []);

  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
    setCustomDate(null);
  };

  const handleCalendarSelect = (date) => {
    setCustomDate(date);
    setShowCalendar(false);
    setSelectedDayIndex(null);
  };

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  const displayedDay = customDate || weekDays[selectedDayIndex]?.fullDate;

  const selectedDateISO = formatDateToISO(displayedDay);

  const { data: movies, isLoading: isLoadingMovies, isError: isErrorMovies } = useMoviesWithShowtimes(selectedDateISO, cinemaId);

  return (
    <div className="w-full relative mt-28">
      <ContentWrapper>
        <div className="flex gap-2 text-2xl mb-4">
          <span>Repertuar</span>
          <span className="text-primary">Cineo:</span>
          <span className="text-primary">Kielce - Galeria Echo</span>
        </div>

        <div className="flex gap-4 overflow-x-auto mb-4 items-center">
          {weekDays.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(index)}
              className={`flex flex-col items-center min-w-[60px] p-2 rounded-lg cursor-pointer transition
                ${!customDate && selectedDayIndex === index ? "bg-primary" : "hover:bg-gray-800 text-white"}`}
            >
              <span>{day.name}</span>
              <span className="text-sm text-gray-400">{day.date}</span>
            </div>
          ))}

          <div className="relative">
            <button
              ref={buttonRef}
              onClick={handleCalendarClick}
              className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary border-2 hover:bg-[#f0294d] text-white cursor-pointer"
            >
              <CalendarIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <hr className="border-t border-primary mb-4" />

        <div className="mb-6">
          <p className="text-white">
            Wybrany dzień:{" "}
            {displayedDay?.toLocaleDateString("pl-PL", {
              weekday: "long",
              day: "numeric",
              month: "numeric",
            })}
          </p>
        </div>
      </ContentWrapper>

      {showCalendar && (
        <div ref={calendarRef}>
          <Calendar
            onSelectDate={handleCalendarSelect}
            selectedDate={customDate}
            buttonRef={buttonRef}
          />
        </div>
      )}

      <ContentWrapper>
        {isLoadingMovies && (
          <LoadingSpinner text="Ładowanie repertuaru..." />
        )}

        {isErrorMovies && (
          <ErrorLoading message="Nie udało się pobrać repertuaru" />
        )}

        {!isLoadingMovies && !isErrorMovies && movies?.length === 0 && (
          <p className="text-gray-400 text-center min-h-[300px]">
            Brak seansów na wybrany dzień
          </p>
        )}

        {!isLoadingMovies && !isErrorMovies && movies?.map((movie) => (
          <div key={movie.id} className="mb-8">
            <RepertoireCard
              movieId={movie.id}
              title={movie.title}
              poster={movie.poster}
              ageRating={movie.ageRating}
              genres={movie.genres}
              showtimes={movie.showtimes}
            />
          </div>
        ))}
      </ContentWrapper>
    </div>
  );s
};

export default RepertoirePage;