import { useUserData, useUserRatings, useUserBookingHistory } from "../api/hooks/userQueries";
import { useState } from "react";
import { useAddOrUpdateRating } from "../api/hooks/ratingQueries";
import ErrorLoading from "../components/loading_components/ErrorLoading";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import ContentWrapper from "../layouts/ContentWrapper";
import RatingSection from "../components/sections/RatingSection";
import { CircleUser, Mail } from "lucide-react";
import BookingHistorySection from "../components/sections/BookingHistorySection";

const ProfilePage = () => {
    const { data: userData, isLoading: isLoadingUserData, isError: isErrorUserData } = useUserData();
    const { data: userRatings, isLoading: isLoadingUserRatings, isError: isErrorUserRatings } = useUserRatings();
    const { mutate: updateRating } = useAddOrUpdateRating();

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

    if (isLoadingUserData || isLoadingUserRatings) {
        return (
            <LoadingSpinner
                text="Ładowanie szczegółów profilu..."
                size={60}
            />
        );
    }

    if (isErrorUserData || isErrorUserRatings) {
        return (
            <ErrorLoading message="Nie udało się załadować danych profilu" />
        );
    }

    const handleRatingUpdate = async (movieId, value) => {
        updateRating({ movieId, value });
    };

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

    const totalRatings = userRatings?.filter(r => r.rating > 0).length || 0;
    const averageRating = totalRatings > 0
        ? (userRatings.filter(r => r.rating > 0).reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1)
        : 0;

        console.log(bookingHistory)

    return (
        <ContentWrapper>
            <div className="mt-26 mb-10">
                <div className="bg-[#111111] rounded-2xl border border-zinc-800 mb-8 p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="rounded-full p-6 border-2 border-primary">
                            <CircleUser
                                className="w-24 h-24 text-primary"
                                strokeWidth={1.5}
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-3 text-white">
                                {userData.lastName} {userData.name}
                            </h1>

                            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{userData.email}</span>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-zinc-800">
                                    <div>
                                        <div className="text-xl text-center font-bold text-white">{totalRatings}</div>
                                        <div className="text-xs ">Ocenionych</div>
                                    </div>
                                </div>

                                {totalRatings > 0 && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-zinc-800">
                                        <div>
                                            <div className="text-xl text-center font-bold text-white">{averageRating}</div>
                                            <div className="text-xs ">Średnia</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <RatingSection
                    userRatings={userRatings}
                    onRatingUpdate={handleRatingUpdate}
                />
                <div className="mb-12">
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

export default ProfilePage;