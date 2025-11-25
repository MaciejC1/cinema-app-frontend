import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post("/public/login", { email, password });

    sessionStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post("/public/auth/logout");

      sessionStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);

      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const stored = sessionStorage.getItem("user");

      if (stored) {
        // 1. jeśli dane są w sessionStorage → ustawiamy
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } else {
        // 2. jeśli nie ma → sprawdzamy backendem (bo może cookie nadal ważne)
        try {
          const res = await api.get("/auth/me"); // backend zwróci usera z cookie
          sessionStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
          setIsAuthenticated(true);
        } catch {
          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
