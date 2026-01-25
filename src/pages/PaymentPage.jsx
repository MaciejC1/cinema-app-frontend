import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Stepper from "../components/loading_components/Stepper";

const PaymentPage = () => {
    const { state } = useLocation();

    if (!state) {
        return <Navigate to="/" replace />;
    }

    const { movie, showtime, seats } = state;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "Imię jest wymagane";
        if (!formData.lastName.trim()) newErrors.lastName = "Nazwisko jest wymagane";
        if (!formData.email.trim()) newErrors.email = "Email jest wymagany";
        if (!formData.phone.trim()) newErrors.phone = "Telefon jest wymagany";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = () => {
        if (!validateForm()) return;

        setIsProcessing(true);

        const payload = {
            seats,
            totalPrice,
            customer: formData,
            showtimeId: showtime.id,
        };

        console.log("PAYMENT PAYLOAD:", payload);

        setTimeout(() => {
            alert("Przekierowanie do PayU...");
            setIsProcessing(false);
        }, 1500);
    };

    const formatShowtimeDate = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });
        const timeFormatter = new Intl.DateTimeFormat("pl-PL", { hour: "2-digit", minute: "2-digit" });
        return `${dateFormatter.format(startDate)}, ${timeFormatter.format(startDate)} - ${timeFormatter.format(endDate)}`;
    };

    const getRowLetter = (rowNumber) => String.fromCharCode(64 + rowNumber);

    return (
        <div className="min-h-screen text-white px-5 lg:px-12 2xl:px-32 py-10">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-end mb-10">
                    <Stepper currentStep={2} />
                </div>

                <div className="bg-[#111111] backdrop-blur-sm rounded-2xl p-6 mb-8 flex gap-6">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-32 h-48 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                        <div className="grid md:grid-cols-2 gap-3 text-sm md:text-base text-gray-300">
                            <div><b className="text-primary">Data:</b> {formatShowtimeDate(showtime.startTime, showtime.endTime)}</div>
                            <div><b className="text-primary">Kino:</b> {showtime.cinemaName}</div>
                            <div><b className="text-primary">Sala:</b> {showtime.hallName}</div>
                            <div><b className="text-primary">Bilety:</b> {seats.length}</div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 bg-[#111111] backdrop-blur-sm rounded-2xl p-8 space-y-5">
                        <h2 className="text-2xl font-bold mb-6">Dane do płatności</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {["firstName", "lastName"].map(field => (
                                <div key={field}>
                                    <input
                                        type="text"
                                        name={field}
                                        placeholder={field === "firstName" ? "Imię" : "Nazwisko"}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        className={`w-full bg-[#111111] border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors ${errors[field] ? 'border-primary' : 'border-white'}`}
                                    />
                                    {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
                                </div>
                            ))}
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-[#111111] border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors ${errors.email ? 'border-primary' : 'border-white'}`}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefon"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full bg-[#111111] border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors ${errors.phone ? 'border-red-500' : 'border-white'}`}
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}

                        <div className="bg-primary/10 border border-primary rounded-xl p-4 text-gray-300 text-sm">
                            Wszystkie pola są wymagane. Po dokonaniu płatności otrzymasz potwierdzenie i bilet elektroniczny.
                        </div>
                    </div>

                    <div className="bg-[#111111] backdrop-blur-sm rounded-2xl p-6 sticky top-6 space-y-5">
                        <h2 className="text-xl font-bold">Podsumowanie</h2>
                        <div className="flex justify-between items-center">
                            <span>Liczba biletów:</span>
                            <span className="text-2xl font-bold">{seats.length}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            {seats.map(seat => (
                                <div key={seat.seatId} className="flex justify-between">
                                    <span className="text-primary font-semibold">
                                        {getRowLetter(seat.rowNumber)}{seat.seatNumber} ({seat.seatType})
                                    </span>
                                    <span className="text-primary font-semibold">{seat.price.toFixed(2)} zł</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold">
                            <span>Do zapłaty:</span>
                            <span className="text-primary text-2xl">{totalPrice.toFixed(2)} zł</span>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full mt-4 bg-primary cursor-pointer hover:brightness-125 py-4 rounded-xl font-bold disabled:bg-gray-600 transition-colors"
                        >
                            {isProcessing ? "Przetwarzanie..." : "Zapłać przez PayU"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
