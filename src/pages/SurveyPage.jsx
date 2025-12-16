import { useState } from "react";
import ContentWrapper from "../layouts/ContentWrapper";
import SurveyCard from "../components/cards/SurveyCard";
import { useGenres } from "../api/hooks/genreQueries";
import LoadingSpinner from "../components/loading_components/LoadingSpinner";
import ErrorLoading from "../components/loading_components/ErrorLoading";
import { useMoviesForSurvey } from "../api/hooks/movieQueries";
import { useMutation } from "@tanstack/react-query";
import { apiWithToken } from "../api/axiosInstance";

import toast from "react-hot-toast";
const REQUIRED_RATINGS = 8;
const REQUIRED_GENRES = 3;

const SurveyPage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ratings, setRatings] = useState({});

  const { data: genres, isLoading: isGenresLoading, isError: isGenresError } = useGenres();
  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError } = useMoviesForSurvey();
  
  const submitSurveyMutation = useMutation({
    mutationFn: async (surveyData) => {
      const { data } = await apiWithToken.post("/user/preference/embedding/create", surveyData);
      return data;
    },
    onSuccess: () => {
      toast.success("Ankieta wysłana!", {
        style: {
          background: "#111111",
          color: "#fff",
        },
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Nie udało się wysłać ankiety", {
        style: {
          background: "#111111",
          color: "#fff",
        },
      });
    },
  });

  if (isGenresLoading || isMoviesLoading) {
    return (
      <ContentWrapper>
        <LoadingSpinner text="Ładowanie ankiety..." />
      </ContentWrapper>
    );
  }

  if (isGenresError || isMoviesError) {
    return (
      <ContentWrapper>
        <ErrorLoading message="Nie udało się załadować ankiety" />
      </ContentWrapper>
    );
  }

  const buildSurveyPayload = () => {
    return {
      favouriteGenres: selectedGenres.map((genre) => genre.name),
      ratings: Object.entries(ratings).map(([movieId, rating]) => ({
        movieId,
        rating
      }))
    };
  };

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const setMovieRating = (movieId, rating) => {
    setRatings(prev => ({ ...prev, [movieId]: rating }));
  };

  const handleSubmit = () => {
    if (selectedGenres.length !== REQUIRED_GENRES) {
      toast.error(`Wybierz dokładnie ${REQUIRED_GENRES} ulubione gatunki`, {
        style: {
          background: "#111111",
          color: "#fff",
        },
      });
      return;
    }

    if (Object.keys(ratings).length < REQUIRED_RATINGS) {
      toast.error(`Oceń przynajmniej ${REQUIRED_RATINGS} filmów`, {
        style: {
          background: "#111111",
          color: "#fff",
        },
      });
      return;
    }

    const payload = buildSurveyPayload();
    console.log("SURVEY PAYLOAD:", payload);
    
    submitSurveyMutation.mutate(payload);
  };


  const ratedCount = Object.keys(ratings).length;
  const progressPercent = (ratedCount / REQUIRED_RATINGS) * 100;

  return (
    <div className="w-full relative pb-24">
      <ContentWrapper>

        <div className="sticky top-0 z-50 bg-black/90 py-2">
          <h1 className="text-2xl font-semibold mb-2">
            Oceniono {ratedCount} z {REQUIRED_RATINGS} filmów
          </h1>

          <div className="w-full h-2 bg-[#111111] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-2 mb-4">
          <span>
            Wybierz ulubione gatunki i oceń kilka filmów, aby otrzymywać trafne rekomendacje.
          </span>
        </div>

        <div className="mb-10 bg-[#111111] p-3 rounded-xl border-1 border-[#404040]">
          <h2 className="text-xl mb-3 text-primary">
            Wybierz 3 ulubione gatunki
          </h2>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const active = selectedGenres.includes(genre);
              return (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre)}
                  className={`
                    px-4 py-2 rounded-full border-2 text-sm bg-black cursor-pointer
                    ${active
                      ? "border-primary bg-primary text-white"
                      : "border-[#404040] text-gray-300 hover:border-primary"}
                  `}
                >
                  {genre.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <SurveyCard
              key={movie.id}
              movie={movie}
              rating={ratings[movie.id]}
              onRate={setMovieRating}
            />
          ))}
        </div>

      </ContentWrapper>

      <button
        onClick={handleSubmit}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-2 rounded-full shadow-lg hover:brightness-125 transition-all z-50 cursor-pointer"
      >
        Zatwierdź wybór
      </button>
    </div>
  );
};

export default SurveyPage;
