import React from 'react';
import { Grid, Box } from '@mui/material';
import type { Dog } from '../../domain/types';
import { DogThumbnail } from '../DogThumbnail';

interface ThumbnailGridProps {
  dogs: Dog[];
  onSelect: (dog: Dog) => void;
}

export const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({
  dogs,
  onSelect,
}) => {
  return (
    <Grid container spacing={1.5} justifyContent="center" sx={{ mt: 2 }}>
      {dogs.map((dog) => (
        <Grid item key={dog.id} xs={4} sm={3} md={2} lg={2}>
          <Box
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 3,
              },
            }}
          >
            <DogThumbnail onClick={() => onSelect(dog)} dog={dog} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
