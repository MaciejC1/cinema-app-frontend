import { useUserBookingHistory } from "../api/hooks/userQueries";
import { useState } from "react";
import ErrorLoading from "../components/loading_components/ErrorLoading";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import ContentWrapper from "../layouts/ContentWrapper";
import BookingHistorySection from "../components/sections/BookingHistorySection";

const TicketHistoryPage = () => {
    const [bookingFilters, setBookingFilters] = useState({
        status: "",
        from: "",
        to: "",
        minAmount: "",
        maxAmount: "",
        page: 0,
        size: 10,
        sort: "createdAt,desc",
    });

    const {
        data: bookingHistory,
        isLoading: isLoadingBookings,
        isError: isErrorBookings
    } = useUserBookingHistory(bookingFilters);

    if (isLoadingBookings) {
        return (
            <LoadingSpinner
                text="Ładowanie biletów..."
                size={60}
            />
        );
    }

    if (isErrorBookings) {
        return (
            <ErrorLoading message="Nie udało się załadować biletów" />
        );
    }

    const handleBookingFilterChange = (filters, page) => {
        console.log(filters)
        const formattedFilters = {
            ...filters,
            from: filters.from ? new Date(filters.from).toISOString() : "",
            to: filters.to ? new Date(filters.to).toISOString() : "",
            page,
            size: 10,
            sort: "createdAt,desc",
        };

        Object.keys(formattedFilters).forEach(key => {
            if (formattedFilters[key] === "" || formattedFilters[key] === null) {
                delete formattedFilters[key];
            }
        });

        setBookingFilters(formattedFilters);
    };

    return (
        <ContentWrapper>
            <div className="mt-26 mb-10">
                <div>
                    {isErrorBookings ? (
                        <ErrorLoading message="Nie udało się załadować historii rezerwacji" />
                    ) : (
                        <BookingHistorySection
                            bookingHistory={bookingHistory}
                            isLoading={isLoadingBookings}
                            onFilterChange={handleBookingFilterChange}
                            currentPage={bookingFilters.page || 0}
                            totalPages={bookingHistory?.totalPages || 0}
                        />
                    )}
                </div>
            </div>
        </ContentWrapper>
    );
}

export default TicketHistoryPage;