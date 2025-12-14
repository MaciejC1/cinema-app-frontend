import { apiWithoutToken, apiWithToken } from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchActiveMovies = async () => {
  const { data } = await apiWithoutToken.get("/public/movies/active");
  return data;
};

const fetchUpcomingMovies = async () => {
  const { data } = await apiWithoutToken.get("/public/movies/upcoming");
  return data;
};

const fetchMovieBySlug = async (slug) => {
  const { data } = await apiWithoutToken.get(`/public/movie/slug/${slug}`);
  return data;
};

const fetchMoviesWithShowtimes = async (date, cinemaId) => {
  const { data } = await apiWithoutToken.get(
    "/public/movies/showtimes",
    {
      params: { date, cinemaId },
    }
  );
  return data;
};

const fetchMovieShowtimes = async (slug, cinemaId) => {
  const { data } = await apiWithoutToken.get(
    "/public/movie/showtimes",
    {
      params: { slug, cinemaId },
    }
  );
  return data;
};

export const useMoviesWithShowtimes = (date, cinemaId) => {
  return useQuery({
    queryKey: ["repertiore", date, cinemaId],
    queryFn: () => fetchMoviesWithShowtimes(date, cinemaId),
    enabled: Boolean(date && cinemaId)
  });
}

export const useMovieShowtimes = (slug, cinemaId) => {
  return useQuery({
    queryKey: ["movie-showtimes", slug, cinemaId],
    queryFn: () => fetchMovieShowtimes(slug, cinemaId),
    enabled: Boolean(cinemaId && slug),
  });
};

export const useActiveMovies = () => {
  return useQuery({
    queryKey: ["active-movies"],
    queryFn: fetchActiveMovies,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: fetchUpcomingMovies,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMovieBySlug = (slug) => {
  return useQuery({
    queryKey: ["movie", slug],
    queryFn: () => fetchMovieBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};