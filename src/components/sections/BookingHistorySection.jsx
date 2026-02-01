import { Calendar, DollarSign, Filter, ChevronLeft, ChevronRight, Ticket } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TicketModal from "../modals/TicketModal";

const BookingHistorySection = ({ bookingHistory, isLoading, onFilterChange, currentPage, totalPages }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [filters, setFilters] = useState({
        status: "",
        from: "",
        to: "",
        minAmount: "",
        maxAmount: "",
    });

    const bookingStatuses = [
        { value: "", label: "Wszystkie" },
        { value: "CREATED", label: "Utworzone" },
        { value: "PAID", label: "Opłacone" },
        { value: "CANCELLED", label: "Anulowane" },
    ];

    const getStatusLabel = (status) => {
        const found = bookingStatuses.find(s => s.value === status);
        return found ? found.label : status;
    };

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters, 0);
    };

    const handlePageChange = (newPage) => {
        onFilterChange(filters, newPage);
    };

    const clearFilters = () => {
        const emptyFilters = {
            status: "",
            from: "",
            to: "",
            minAmount: "",
            maxAmount: "",
        };
        setFilters(emptyFilters);
        onFilterChange(emptyFilters, 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <div className="mb-8 mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-white">
                        Historia rezerwacji
                    </h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-primary rounded-lg border border-zinc-700 transition-colors cursor-pointer"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filtry</span>
                    </button>
                </div>

                {showFilters && (
                    <div className="bg-[#111111] rounded-lg border border-zinc-800 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange("status", e.target.value)}
                                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                >
                                    {bookingStatuses.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Od daty</label>
                                <input
                                    type="datetime-local"
                                    value={filters.from}
                                    onChange={(e) => handleFilterChange("from", e.target.value)}
                                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Do daty</label>
                                <input
                                    type="datetime-local"
                                    value={filters.to}
                                    onChange={(e) => handleFilterChange("to", e.target.value)}
                                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kwota min</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={filters.minAmount}
                                    onChange={(e) => handleFilterChange("minAmount", e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kwota max</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={filters.maxAmount}
                                    onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={clearFilters}
                                    className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 text-sm transition-colors cursor-pointer"
                                >
                                    Wyczyść filtry
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-400">Ładowanie...</p>
                </div>
            ) : bookingHistory && bookingHistory.content && bookingHistory.content.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {bookingHistory.content.map((booking, index) => (
                            <div
                                onClick={() => setSelectedBooking(booking)}
                                key={booking.showtime?.id || index}
                                className="bg-[#111111] rounded-lg border border-zinc-800 hover:border-primary transition-all p-3 cursor-pointer"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {booking.movie && (
                                        <Link
                                            to={`/movie/${booking.movie.slug}`}
                                            className="shrink-0"
                                        >
                                            <img
                                                src={booking.movie.poster}
                                                alt={booking.movie.title}
                                                className="w-24 h-36 object-cover rounded-lg hover:scale-105 transition-transform"
                                            />
                                        </Link>
                                    )}

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                {booking.movie && (
                                                    <Link
                                                        to={`/movie/${booking.movie.slug}`}
                                                        className="text-xl font-bold text-white hover:text-primary transition-colors"
                                                    >
                                                        {booking.movie.title}
                                                    </Link>
                                                )}
                                                {booking.cinema && (
                                                    <p className="text-sm text-primary mt-1">
                                                        {booking.cinema.name}, {booking.cinema.city}
                                                    </p>
                                                )}
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium border bg-primary`}
                                            >
                                                {getStatusLabel(booking.status)}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            {booking.showtime && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(booking.showtime.startTime)}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-white">
                                                    {booking.amount.toFixed(2)} PLN
                                                </span>
                                            </div>
                                            {booking.seats && booking.seats.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Ticket className="w-4 h-4" />
                                                    <span>
                                                        Bilety: {booking.seats.length}
                                                    </span>
                                                </div>
                                            )}
                                            {booking.showtime && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs">
                                                        {booking.showtime.is3d ? '3D' : '2D'} - {booking.showtime.language}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === index
                                        ? "bg-primary border-primary text-white"
                                        : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-20 bg-zinc-900 rounded-lg border border-zinc-800">
                    <Ticket className="w-20 h-20 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-400 text-xl font-medium mb-2">
                        Brak historii rezerwacji
                    </p>
                    <p className="text-gray-600 text-sm">
                        Twoje rezerwacje pojawią się tutaj
                    </p>
                </div>
            )}

            <TicketModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
            />
        </div>
    );
};

export default BookingHistorySection;