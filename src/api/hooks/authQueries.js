import { apiWithoutToken } from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";

const registerRequest = async (userData) => {
    const { data } = await apiWithoutToken.post('/public/register', userData);
    return data;
};

export const useRegister = () => {
    return useMutation({
        mutationFn: registerRequest,
    });
};
