import React, { useState, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { useShowTimeData } from "../api/hooks/showtimesQueries";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import ErrorLoading from "../components/loading_components/ErrorLoading";
import Stepper from "../components/loading_components/Stepper";
import ScreenIcon from "../assets/screen.png";
import seat_avaiable_icon from "../assets/icons/seat_avaiable.png";
import seat_disabled_icon from "../assets/icons/seat_disabled.png";
import seat_selected_icon from "../assets/icons/seat_selected.png";
import seat_unavaiable_icon from "../assets/icons/seat_unavaiable.png";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
    const { showtimeId } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    const {
        data: showData,
        isLoading,
        isError,
    } = useShowTimeData(showtimeId);

    const organizedSeats = useMemo(() => {
        if (!showData?.seats) return {};

        const seatsByRow = {};
        showData.seats.forEach(seat => {
            if (!seatsByRow[seat.rowNumber]) {
                seatsByRow[seat.rowNumber] = [];
            }
            seatsByRow[seat.rowNumber].push(seat);
        });

        Object.keys(seatsByRow).forEach(row => {
            seatsByRow[row].sort((a, b) => a.seatNumber - b.seatNumber);
        });

        return seatsByRow;
    }, [showData?.seats]);


    if (isLoading) {
        return <LoadingSpinner text="Ładowanie seansu..." />;
    }

    if (isError) {
        return (
            <ErrorLoading message="Nie udało się pobrać danych seansu" />
        );
    }

    const movie = {
        title: showData.movie?.title,
        poster: showData.movie?.poster,
        id: showData.movie?.id,
    };

    const formatLabel = `${showData.hasSubtitles
        ? "napisy"
        : showData.audioTrack === "DUBBING"
            ? "dubbing"
            : "lektor"
        }, ${showData.is3d ? "3D" : "2D"}`;

    const formatShowtimeDate = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);

        const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const timeFormatter = new Intl.DateTimeFormat("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${dateFormatter.format(start)}, ${timeFormatter.format(
            start
        )} - ${timeFormatter.format(end)}`;
    };

    const rowNumbers = Object.keys(organizedSeats).map(Number).sort((a, b) => a - b);
    const rowLetters = rowNumbers.map((_, idx) => String.fromCharCode(65 + idx));

    const handleSeatClick = (seat) => {
        if (!seat.isAvailable || !seat.isAvailableForShowtime) return;

        setSelectedSeats(prev => {
            const exists = prev.find(s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber);
            if (exists) {
                return prev.filter(s => !(s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber));
            } else {
                let price = showData.basePrice;
                if (seat.seatType === "premium") price = showData.premiumPrice;
                if (seat.seatType === "vip") price = showData.vipPrice;
                const seatId = seat.id

                return [...prev, { ...seat, price, seatId }];
            }
        });
    };
    console.log(selectedSeats)
    const getSeatIcon = (seat) => {
        const isSelected = selectedSeats.some(s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber);

        if (isSelected) return seat_selected_icon;
        if (seat.seatType === "wheelchair") return seat_disabled_icon;
        if (!seat.isAvailable || !seat.isAvailableForShowtime) return seat_unavaiable_icon;
        return seat_avaiable_icon;
    };

    const getSeatStyle = (seat) => {
        const isSelected = selectedSeats.some(s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber);

        if (isSelected) return 'cursor-pointer hover:scale-110 transition-transform relative';
        if (!seat.isAvailable || !seat.isAvailableForShowtime) return 'cursor-not-allowed opacity-60 relative';
        return 'cursor-pointer hover:scale-110 transition-transform relative';
    };

    return (
        <div className="px-5 lg:px-5 xl:px-12 2xl:px-32 pb-12">
            <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col lg:flex-row gap-6 w-full items-center">
                    <div className="flex gap-4 flex-1">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="h-48 sm:h-56 md:h-60 lg:h-60 object-cover rounded-2xl aspect-3/4"
                        />

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl sm:text-3xl font-semibold">
                                {movie.title} ({formatLabel})
                            </h1>

                            <div className="flex flex-col gap-1 text-base sm:text-lg">
                                <div className="flex gap-2">
                                    <span className="text-primary font-medium min-w-[120px]">
                                        Data seansu:
                                    </span>
                                    <span>
                                        {formatShowtimeDate(showData.startTime, showData.endTime)}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-primary font-medium min-w-[120px]">
                                        Kino:
                                    </span>
                                    <span>
                                        {showData.cinema?.name}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-primary font-medium min-w-[120px]">
                                        Sala:
                                    </span>
                                    <span>
                                        {showData.hallName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start justify-center lg:justify-end flex-1">
                        <Stepper currentStep={1} />
                    </div>
                </div>

                <div className="flex justify-between gap-10">

                    <div className="flex flex-col">
                        <div className="w-full flex justify-center">
                            <div className="w-3/4 max-w-xl">
                                <img
                                    src={ScreenIcon}
                                    alt="Ekran"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 w-full">
                            <div className="flex-1 flex justify-center">
                                <div className="inline-block bg-black/20 p-4 sm:p-6 md:p-8 rounded-2xl">
                                    <div className="flex flex-col gap-2">
                                        {rowNumbers.map((rowNum, rowIdx) => (
                                            <div key={rowNum} className="flex items-center gap-2">
                                                <span className="text-gray-400 font-semibold text-sm w-6 text-center">
                                                    {rowLetters[rowIdx]}
                                                </span>

                                                <div className="flex md:gap-x-3 lg:gap-x-8">
                                                    {organizedSeats[rowNum]?.map((seat) => (
                                                        <button
                                                            key={`${seat.rowNumber}-${seat.seatNumber}`}
                                                            onClick={() => handleSeatClick(seat)}
                                                            className={getSeatStyle(seat)}
                                                            disabled={!seat.isAvailable || !seat.isAvailableForShowtime}
                                                        >
                                                            <img
                                                                src={getSeatIcon(seat)}
                                                                alt={`Miejsce ${seat.seatNumber}`}
                                                                className="w-8 sm:w-10"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>

                                                <span className="text-gray-400 font-semibold text-sm w-6 text-center">
                                                    {rowLetters[rowIdx]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#111111] p-5 rounded-2xl">
                            <div className="flex gap-x-10">
                                <div className="flex items-center gap-2">
                                    <img src={seat_avaiable_icon} alt="Dostępne" className="w-6" />
                                    <span className="text-sm text-gray-300">Dostępne</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src={seat_selected_icon} alt="Wybrane" className="w-6" />
                                    <span className="text-sm text-gray-300">Wybrane</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src={seat_disabled_icon} alt="Niepełnosprawni" className="w-6" />
                                    <span className="text-sm text-gray-300">Niepełnosprawni</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src={seat_unavaiable_icon} alt="Niedostępne" className="w-6" />
                                    <span className="text-sm text-gray-300">Niedostępne</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col justify-between h-full w-[310px] gap-y-10">
                        <div className="bg-[#111111] p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-4">Podsumowanie</h2>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <span className="">Liczba biletów:</span>
                                    <span className="text-2xl font-bold ">
                                        {selectedSeats.length}
                                    </span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <div className="flex items-center gap-2">
                                        <img src={seat_selected_icon} alt="Wybrane" className="w-6 h-6" />
                                        <span>Wybrane miejsca:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedSeats.length > 0 ? (
                                            selectedSeats.map((seat, idx) => {
                                                const rowIdx = rowNumbers.indexOf(seat.rowNumber);
                                                return (
                                                    <span key={`${seat.rowNumber}-${seat.seatNumber}`} className="text-primary font-semibold">
                                                        {rowLetters[rowIdx]}{seat.seatNumber}
                                                        {idx !== selectedSeats.length - 1 && ','}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className="text-gray-500">Brak</span>
                                        )}

                                    </div>
                                </div>

                                <button
                                    className="w-full bg-primary hover:brightness-125 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl mt-4 transition-colors"
                                    disabled={selectedSeats.length === 0}
                                    onClick={() => {
                                        navigate("/payment", {
                                            state: {
                                                showtimeId: showtimeId,
                                                movie: {
                                                    title: movie.title,
                                                    poster: movie.poster,
                                                },
                                                showtime: {
                                                    id: showtimeId,
                                                    startTime: showData.startTime,
                                                    endTime: showData.endTime,
                                                    hallName: showData.hallName,
                                                    cinemaName: showData.cinema?.name,
                                                },
                                                seats: selectedSeats,
                                                prices: {
                                                    base: showData.basePrice,
                                                    premium: showData.premiumPrice,
                                                    vip: showData.vipPrice,
                                                }
                                            }
                                        });
                                    }}
                                >
                                    Przejdź dalej
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#111111] p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-3">Cennik</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <span>Bilet standardowy:</span>
                                    <span className="text-primary font-semibold">
                                        {showData.basePrice.toFixed(2)} zł
                                    </span>
                                </div>
                                {showData.premiumPrice && (
                                    <div className="flex justify-between">
                                        <span>Bilet premium:</span>
                                        <span className="text-primary font-semibold">
                                            {showData.premiumPrice.toFixed(2)} zł
                                        </span>
                                    </div>
                                )}
                                {showData.vipPrice && (
                                    <div className="flex justify-between">
                                        <span>Bilet VIP:</span>
                                        <span className="text-primary font-semibold">
                                            {showData.vipPrice.toFixed(2)} zł
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>


                </div>


            </div >
        </div >
    );
};

export default TicketPage;