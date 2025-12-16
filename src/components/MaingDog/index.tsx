import React from 'react';
import type { Dog } from '../../domain/types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

interface MainDogProps {
  dog: Dog | null;
  addToFavorites: (dog: Dog) => void;
}

const MainDog: React.FC<MainDogProps> = ({ dog, addToFavorites }) => {
  if (!dog) return null;

  return (
    <Card sx={{ maxWidth: 400, margin: '20px auto', boxShadow: 3 }}>
      <CardMedia
        data-testid={`dog-main`}
        component="img"
        height="300"
        image={dog.imageUrl}
        alt={dog.breed}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {dog.breed.toUpperCase()}
        </Typography>
        <Button
          onClick={() => {
            addToFavorites(dog);
          }}
          variant="contained"
          color="primary"
        >
          Add to Favorites
        </Button>
      </CardContent>
    </Card>
  );
};

export default MainDog;
