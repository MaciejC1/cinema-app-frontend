import { Calendar, MapPin, X } from "lucide-react";

const TicketModal = ({ booking, onClose }) => {
    if (!booking) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusLabel = (status) => {
        const bookingStatuses = [
            { value: "", label: "Wszystkie" },
            { value: "CREATED", label: "Utworzone" },
            { value: "PAID", label: "Opłacone" },
            { value: "CANCELLED", label: "Anulowane" },
        ];
        const found = bookingStatuses.find(s => s.value === status);
        return found ? found.label : status;
    };

    return (
        <div
            className="fixed inset-0 bg-[black/80] backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-zinc-900 rounded-2xl border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {booking.movie?.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                            {booking.cinema && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{booking.cinema.name}, {booking.cinema.city}</span>
                                </div>
                            )}
                            {booking.showtime && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(booking.showtime.startTime)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="bg-[#111111] rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Status</p>
                                <p className="font-semibold text-primary">{getStatusLabel(booking.status)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Liczba biletów</p>
                                <p className="font-semibold">{booking.seats?.length || 0}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Całkowita kwota</p>
                                <p className="font-semibold text-white">{booking.amount.toFixed(2)} PLN</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Format</p>
                                <p className="font-semibold">
                                    {booking.showtime?.is3d ? '3D' : '2D'} - {booking.showtime?.language}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Bilety</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {booking.seats?.map((ticket, index) => (
                                <div
                                    key={ticket.ticketCode}
                                    className="bg-[#111111]rounded-lg border border-zinc-800 overflow-hidden"
                                >
                                    <div className="bg-primary/40 border-b border-zinc-700 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs mb-1">Bilet #{index + 1}</p>
                                                <p className="font-bold text-white">
                                                    Rząd {ticket.seat.rowNumber}, Miejsce {ticket.seat.seatNumber}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs mb-1">Cena</p>
                                                <p className="font-bold text-primary">{ticket.price.toFixed(2)} PLN</p>
                                            </div>
                                        </div>
                                        <p className="text-xs mt-2 capitalize">
                                            {ticket.seat.seatType}
                                        </p>
                                    </div>

                                    <div className="p-4 flex flex-col items-center">
                                        <img
                                            src={`data:image/png;base64,${ticket.qrCode}`}
                                            alt={`QR Code dla biletu ${index + 1}`}
                                            className="w-48 h-48 bg-white p-2 rounded-lg"
                                        />
                                        <p className="text-xs text-gray-500 mt-3 font-mono break-all text-center">
                                            {ticket.ticketCode}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {booking.cinema && (
                        <div className="mt-6 bg-[#111111] rounded-lg p-4">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                Adres kina
                            </h4>
                            <p className="text-sm">
                                {booking.cinema.address}<br />
                                {booking.cinema.postalCode} {booking.cinema.city}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketModal;