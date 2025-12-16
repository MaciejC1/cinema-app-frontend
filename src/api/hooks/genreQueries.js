import { apiWithoutToken } from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchgenres= async () => {
    const { data } = await apiWithoutToken.get("/public/genres");
    return data;
};

export const useGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: fetchgenres,
        staleTime: 1000 * 60 * 5,
    });
};
