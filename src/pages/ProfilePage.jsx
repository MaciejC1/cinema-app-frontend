import { useUserData, useUserRatings, useUserBookingHistory} from "../api/hooks/userQueries";
import ErrorLoading from "../components/loading_components/ErrorLoading";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import ContentWrapper from "../layouts/ContentWrapper";
import { CircleUser } from "lucide-react";

const ProfilePage = () => {
    const { data: userData, isLoading: isLoadingUserData, isError: isErrorUserData } = useUserData();
    const { data: userRatings, isLoading: isLoadingUserRatings, isError: isErrorUserRatings } = useUserRatings();

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

    console.log(userRatings)

    return (
        <ContentWrapper>
            <div className="flex flex-col items-center justify-center mt-26">
                <div className="bg-[#111111] rounded-full p-12 mb-6 flex items-center justify-center flex-col ">
                    <CircleUser
                        color="#DF2144"
                        strokeWidth={1}
                        className="w-32 h-32"
                    />
                    <h1 className="text-white text-3xl font-semibold">
                        {userData.name} {userData.lastName}
                    </h1>
                </div>


            </div>
        </ContentWrapper>
    );
}

export default ProfilePage;