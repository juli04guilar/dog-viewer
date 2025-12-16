import { parseDog } from '../domain/dog';
import type { Dog } from '../domain/types';

const DEFAULT_LIMIT = 10;

interface DogAPIResponse {
  message: string[];
  status: 'success' | 'error';
}

export const fetchRandomDogs = async (
  count: number,
  signal?: AbortSignal,
): Promise<Dog[]> => {
  const total = count ?? DEFAULT_LIMIT;
  const DOGS_API = `https://dog.ceo/api/breeds/image/random/${total}`;
  const res = await fetch(DOGS_API, { signal });

  if (!res.ok) {
    throw new Error('Failed to fetch dogs');
  }

  const data: DogAPIResponse = await res.json();

  return data.message.map(parseDog);
};
