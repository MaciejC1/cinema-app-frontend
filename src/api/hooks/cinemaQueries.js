import { apiWithoutToken } from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchCinemas= async () => {
    const { data } = await apiWithoutToken.get("/public/cinemas");
    return data;
};

export const useCinemas = () => {
    return useQuery({
        queryKey: ["cinemas"],
        queryFn: fetchCinemas,
        staleTime: 1000 * 60 * 5,
    });
};
