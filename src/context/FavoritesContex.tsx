import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { Dog } from '../domain/types';

interface FavoritesContextType {
  favorites: Dog[];
  addToFavorites: (dog: Dog) => void;
  removeFromFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const addToFavorites = (dog: Dog) => {
    console.log('here ');
    setFavorites((prev) => {
      const dogExists = prev.find((d) => d.id === dog.id);
      if (dogExists) return prev;
      return [...prev, dog];
    });
  };

  const removeFromFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((d) => d.id !== id));
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
