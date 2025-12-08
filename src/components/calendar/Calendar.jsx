import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ onSelectDate, selectedDate, buttonRef }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  const dayNames = ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"];

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const daysInMonth = lastDay.getDate();
    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const handleDayClick = (date) => {
    if (!date) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date < today) return;
    
    onSelectDate(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const calendarDays = generateCalendarDays();

  return (
    <div
      className="fixed z-50"
      style={{
        top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY + 4,
        left: buttonRef.current?.getBoundingClientRect().left + (buttonRef.current?.getBoundingClientRect().width / 2),
        transform: "translateX(-50%)",
      }}
    >
      <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-2xl border border-white min-w-[300px]">
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

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isPast = isBeforeToday(day);
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, selectedDate);

            return (
              <div
                key={index}
                onClick={() => !isPast && handleDayClick(day)}
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
  );
};

export default Calendar;