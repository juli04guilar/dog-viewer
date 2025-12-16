import type { Dog } from './types';

export const parseDog = (imageUrl: string): Dog => {
  const parts = imageUrl.split('/');
  const breedPart = parts[parts.indexOf('breeds') + 1];
  return {
    id: imageUrl,
    imageUrl,
    breed: breedPart.replace('-', ' '),
  };
};
