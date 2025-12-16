import { useState } from 'react';
import MainDog from './components/MaingDog';
import { ThumbnailGrid } from './components/ThumbnailGrid';
import { useDogs } from './hooks/useDogs';
import type { Dog } from './domain/types';
import { FavoritesProvider, useFavorites } from './context/FavoritesContex';
import Sidebar from './components/SideBar';

const AppContent = () => {
  // Fetching 11  =  1 main + 10 thumbnails
  const { loading, error, dogs } = useDogs(11);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const { addToFavorites, removeFromFavorite, favorites } = useFavorites();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const currentDog = selectedDog || dogs[0];

  const addFavoritesHandler = (dog: Dog) => {
    addToFavorites(dog);
    setIsSidebarOpen(true);
  };

  return (
    <div className="app">
      <MainDog addToFavorites={addFavoritesHandler} dog={currentDog} />
      <ThumbnailGrid
        onSelect={(dog: Dog) => setSelectedDog(dog)}
        dogs={dogs.slice(1)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <h3 data-testid="favorite-list">Favorites List</h3>
        {favorites.length === 0 ? (
          <p>No favorite dogs yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {favorites.map((dog, index) => (
              <li
                onClick={() => setSelectedDog(dog)}
                key={dog.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <img
                  data-testid={`favorite-image-${index + 1}`}
                  src={dog.imageUrl}
                  alt={dog.breed}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    marginRight: '0.5rem',
                  }}
                />
                <span style={{ flex: 1 }}>{dog.breed}</span>
                <button
                  data-testid="remove"
                  onClick={() => removeFromFavorite(dog.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </Sidebar>
    </div>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

export default App;
