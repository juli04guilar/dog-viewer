import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchRandomDogs } from './dogApi';

vi.mock('../domain/dog', () => ({
  parseDog: vi.fn((url: string) => ({
    id: url,
    imageUrl: url,
    breed: 'mock-breed',
  })),
}));

const mockApiResponse = {
  message: [
    'https://images.dog.ceo/breeds/spaniel-cocker/n02102318_2048.jpg',
    'https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_2725.jpg',
    'https://images.dog.ceo/breeds/rajapalayam-indian/Rajapalayam-dog.jpg',
  ],
  status: 'success',
};

describe('fetchRandomDogs', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponse),
        } as Response),
      ),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses DEFAULT_LIMIT when count is undefined', async () => {
    const controller = new AbortController();
    await fetchRandomDogs(undefined as unknown as number, controller.signal);

    expect(fetch).toHaveBeenCalledWith(
      'https://dog.ceo/api/breeds/image/random/10',
      expect.any(Object),
    );
  });
});
