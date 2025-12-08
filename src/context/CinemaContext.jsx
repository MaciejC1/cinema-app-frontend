import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useCinemas } from "../api/hooks/cinemaQueries";

const CinemaContext = createContext();

export const CinemaProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { data: cinemas = [], isLoading } = useCinemas();

  const [cinema, setCinema] = useState(null);
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    if (!cinemas.length) return;

    const saved = localStorage.getItem("selectedCinema");

    if (saved) {
      setCinema(JSON.parse(saved));
      setUserSelected(true);
      return;
    }
    setCinema(cinemas[0]);
  }, [cinemas]);

  useEffect(() => {
    if (
      isAuthenticated &&
      user?.cinema &&
      !userSelected
    ) {
      setCinema(user.cinema);
      localStorage.setItem("selectedCinema", JSON.stringify(user.cinema));
    }
  }, [isAuthenticated, user, userSelected]);

  const changeCinema = (newCinema) => {
    setCinema(newCinema);
    setUserSelected(true);
    localStorage.setItem("selectedCinema", JSON.stringify(newCinema));
  };

  return (
    <CinemaContext.Provider
      value={{
        cinema,
        cinemas,
        changeCinema,
        isLoading,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
};

export const useCinema = () => useContext(CinemaContext);
