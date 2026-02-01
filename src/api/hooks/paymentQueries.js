import { useMutation } from "@tanstack/react-query";
import { apiWithoutToken, apiWithToken } from "../axiosInstance";

const createBooking = async (bookingRequest) => {
  const { data } = await apiWithToken.post(
    "/public/booking",
    bookingRequest
  );
  return data;
};

export const usePayment = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};
