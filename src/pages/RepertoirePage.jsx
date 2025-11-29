import ContentWrapper from "../layouts/ContentWrapper";
import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const RepertoirePage = () => {
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [customDate, setCustomDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const buttonRef = useRef(null);
  const calendarRef = useRef(null);

  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  const dayNames = ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"];

  // Generuj 7 dni od dzisiaj
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

  // Generuj dni w miesiącu
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const daysInMonth = lastDay.getDate();
    const days = [];
    
    // Puste komórki przed pierwszym dniem
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Dni miesiąca
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
    setCustomDate(null);
  };

  const handleCalendarDayClick = (date) => {
    if (!date) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date < today) return; // Blokuj przeszłe dni
    
    setCustomDate(date);
    setShowCalendar(false);
    setSelectedDayIndex(null);
  };

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
    if (!showCalendar) {
      setCurrentMonth(new Date());
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = generateCalendarDays();

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isBeforeToday = (date) => {
    if (!date) return false;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

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
        <div
          ref={calendarRef}
          className="fixed z-50"
          style={{
            top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY + 4,
            left: buttonRef.current?.getBoundingClientRect().left + (buttonRef.current?.getBoundingClientRect().width / 2),
            transform: "translateX(-50%)",
          }}
        >
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-2xl border border-white min-w-[300px]">
            {/* Header z nawigacją */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-[#202020] cursor-pointer rounded transition"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="text-white font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-[#202020] cursor-pointer rounded transition"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Nazwy dni tygodnia */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs text-gray-400 font-medium py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Dni miesiąca */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const isPast = isBeforeToday(day);
                const isToday = isSameDay(day, today);
                const isSelected = isSameDay(day, customDate);

                return (
                  <div
                    key={index}
                    onClick={() => !isPast && handleCalendarDayClick(day)}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition
                      ${!day ? "" : isPast 
                        ? "text-gray-600 cursor-not-allowed" 
                        : "text-white cursor-pointer hover:bg-gray-700"
                      }
                      ${isToday && !isSelected ? "border-2 border-primary" : ""}
                      ${isSelected ? "bg-primary text-white font-bold" : ""}
                    `}
                  >
                    {day ? day.getDate() : ""}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepertoirePage;