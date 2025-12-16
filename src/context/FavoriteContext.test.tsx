import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFavorites } from './FavoritesContex';

const TestComponent = () => {
  useFavorites();
  return null;
};

describe('useFavorites', () => {
  it('throws error when used outside FavoritesProvider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useFavorites must be used within FavoritesProvider',
    );
  });
});
