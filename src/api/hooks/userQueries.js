import { apiWithoutToken, apiWithToken } from "../axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";

export const fetchUserPreferenceStatus = async () => {
  const { data } = await apiWithToken.get(
    "/user/preferences/status"
  );
  return data;
};

export const fetchUserData = async () => {
  const { data } = await apiWithToken.get(
    "/user/auth/me"
  );
  return data;
};

const fetchAIRecommendation = async () => {
  const { data } = await apiWithToken.get("/public/ai/recommendation");
  return data;
};

export const useAIRecommendationMutation = () => {
  return useMutation({
    mutationFn: fetchAIRecommendation,
  });
};

const fetchUserPreferenceGenres = async () => {
  const { data } = await apiWithToken.get(
    "/user/preferences/genres"
  );
  return data;
};

const fetchUserRatings = async () => {
  const { data } = await apiWithToken.get(
    "/user/movies/rating"
  );
  return data;
};

const fetchUserMatchToMovies = async (userId) => {
  const { data } = await apiWithoutToken.get(
    "/public/recommendation/content-based/all",
    {
      params: {
        userId,
      },
    }
  );
  return data;
};

const fetchUserMatchToMoviesCF = async (userId) => {
  const { data } = await apiWithoutToken.get(
    "/public/recommendation/collaborative-filtering/all",
    {
      params: {
        userId,
      },
    }
  );
  return data;
};

const fetchUserBookingHistory = async ({
  status,
  from,
  to,
  minAmount,
  maxAmount,
  page = 0,
  size = 10,
  sort = "createdAt,desc",
}) => {
  const { data } = await apiWithToken.get(
    "/user/booking/history",
    {
      params: {
        status,
        from,
        to,
        minAmount,
        maxAmount,
        page,
        size,
        sort,
      },
    }
  );

  return data;
};


export const fetchUserMatchToMovie = async (userId, movieId) => {
  const { data } = await apiWithoutToken.get(
    "/public/recommendation/match",
    {
      params: {
        userId,
        movieId,
      },
    }
  );
  return data;
};

export const useUserBookingHistory = (filters = {}, enabled = true) => {
  return useQuery({
    queryKey: ["user-booking-history", filters],
    queryFn: () => fetchUserBookingHistory(filters),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
};


export const useUserPreferenceStatus = (enabled = false) => {
  return useQuery({
    queryKey: ["user-preference-status"],
    queryFn: fetchUserPreferenceStatus,
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useUserPreferenceGenres = (enabled = false) => {
  return useQuery({
    queryKey: ["user-preference-genres"],
    queryFn: fetchUserPreferenceGenres,
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useUserRatings = () => {
  return useQuery({
    queryKey: ["user-ratings"],
    queryFn: fetchUserRatings,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useUserMatchToMovie = (userId, movieId, enabled = false) => {
  return useQuery({
    queryKey: ["user-movie-match", userId, movieId],
    queryFn: () => fetchUserMatchToMovie(userId, movieId),
    enabled: !!userId && !!movieId && enabled,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
};

export const useUserMatchToMovies = (userId) => {
  return useQuery({
    queryKey: ["user-movies-match", userId],
    queryFn: () => fetchUserMatchToMovies(userId),
    enabled: !!userId,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
};

export const useUserMatchToMoviesCF = (userId) => {
  return useQuery({
    queryKey: ["user-movies-match-cf", userId],
    queryFn: () => fetchUserMatchToMoviesCF(userId),
    enabled: !!userId,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
};
