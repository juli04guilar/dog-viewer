import React from 'react';
import type { Dog } from '../../domain/types';
import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';

interface DogThumbnailProps {
  dog: Dog;
  onClick: (dog: Dog) => void;
}

export const DogThumbnail: React.FC<DogThumbnailProps> = ({ dog, onClick }) => {
  return (
    <Card
      sx={{
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' },
      }}
    >
      <CardActionArea onClick={() => onClick(dog)}>
        <CardMedia
          component="img"
          height="120"
          image={dog.imageUrl}
          alt={dog.breed}
        />
        <Typography
          variant="subtitle2"
          sx={{ textAlign: 'center', mt: 1, fontWeight: 'medium' }}
        >
          {dog.breed}
        </Typography>
      </CardActionArea>
    </Card>
  );
};
