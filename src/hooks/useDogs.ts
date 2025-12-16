import { useEffect, useState } from 'react';
import type { Dog } from '../domain/types';
import { fetchRandomDogs } from '../api/dogApi';

export const useDogs = (count: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDogs = async () => {
      setLoading(true);
      try {
        const dogs = await fetchRandomDogs(count, signal);
        setDogs(dogs);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('aborting request');
          return;
        }
        if (err instanceof Error) {
          setError('something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDogs();
    return () => {
      controller.abort();
    };
  }, [count]);
  return { loading, error, dogs };
};
