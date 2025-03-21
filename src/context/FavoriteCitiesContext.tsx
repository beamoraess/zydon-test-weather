"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FavoriteCitiesContextType {
  favoriteCities: string[];
  toggleFavorite: (city: string) => void;
}

const FavoriteCitiesContext = createContext<FavoriteCitiesContextType | undefined>(
  undefined
);

export const FavoriteCitiesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteCities");
    if (savedFavorites) {
      setFavoriteCities(JSON.parse(savedFavorites));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const toggleFavorite = (city: string) => {
    setFavoriteCities((prev) => {
      const newFavorites = prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city];
      return newFavorites;
    });
  };

  return (
    <FavoriteCitiesContext.Provider value={{ favoriteCities, toggleFavorite }}>
      {children}
    </FavoriteCitiesContext.Provider>
  );
};

export const useFavoriteCities = () => {
  const context = useContext(FavoriteCitiesContext);
  if (!context) {
    throw new Error("useFavoriteCities must be used within a FavoriteCitiesProvider");
  }
  return context;
};