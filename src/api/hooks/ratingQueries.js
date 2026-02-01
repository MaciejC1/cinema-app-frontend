import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiWithToken } from "../axiosInstance";

const addOrUpdateRating = async ({ movieId, value }) => {
  const { data } = await apiWithToken.post(
    `/user/movie/${movieId}`,
    { value: Number(value) }
  );
  return data;
};

export const useAddOrUpdateRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrUpdateRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRatings"] });
    },
  });
};
