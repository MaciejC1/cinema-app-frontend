import { apiWithoutToken, apiWithToken } from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchShowTimeData = async (show_id) => {
  const { data } = await apiWithoutToken.get(`/public/showtime/${show_id}`);
  return data;
};

export const useShowTimeData = (show_id) => {
  return useQuery({
    queryKey: ["showtime", show_id],
    queryFn: () => fetchShowTimeData(show_id),
    enabled: !!show_id,
    staleTime: 1000 * 60 * 5,
  });
};