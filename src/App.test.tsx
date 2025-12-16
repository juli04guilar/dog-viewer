import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';

const mockApiResponse = {
  message: [
    'https://images.dog.ceo/breeds/labrador/n02099712_100.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_200.jpg',
    'https://images.dog.ceo/breeds/poodle/n02113799_300.jpg',
  ],
  status: 'success',
};

describe('App with real hooks and mocked API', () => {
  let fetchMock: typeof global.fetch;

  beforeEach(() => {
    fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      } as Response),
    );
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading and then main dog and thumbnails correctly', async () => {
    render(<App />);

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for main dog to appear (labrador)
    await waitFor(() =>
      expect(screen.getByTestId('dog-main')).toHaveAttribute(
        'src',
        mockApiResponse.message[0],
      ),
    );

    // Check thumbnails match remaining dogs
    const thumbnail1 = screen.getByAltText(/beagle/i);
    const thumbnail2 = screen.getByAltText(/poodle/i);

    expect(thumbnail1).toHaveAttribute('src', mockApiResponse.message[1]);
    expect(thumbnail2).toHaveAttribute('src', mockApiResponse.message[2]);

    // Clicking a thumbnail updates main dog
    fireEvent.click(thumbnail1);
    await waitFor(() =>
      expect(screen.getByTestId('dog-main')).toHaveAttribute(
        'src',
        mockApiResponse.message[1],
      ),
    );
  });

  it('adds and removes a dog from favorites correctly', async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId('dog-main')).toHaveAttribute(
        'src',
        mockApiResponse.message[0],
      ),
    );

    // Add main dog to favorites
    fireEvent.click(screen.getByText(/Add to Favorites/i));
    expect(screen.getByTestId('favorite-list')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-image-1')).toHaveAttribute(
      'src',
      mockApiResponse.message[0],
    );

    // Remove from favorites
    fireEvent.click(screen.getByTestId('remove'));
    expect(screen.getByText(/No favorite dogs yet./i)).toBeInTheDocument();
  });
  it('does not add duplicate dogs to favorites', async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId('dog-main')).toHaveAttribute(
        'src',
        mockApiResponse.message[0],
      ),
    );

    const addButton = screen.getByText(/Add to Favorites/i);
    // add for the first time
    fireEvent.click(addButton);
    // add the same dog again
    fireEvent.click(addButton);

    const favorites = screen.getAllByTestId(/favorite-image-/i);
    const favoriteImages = favorites.filter(
      (el) => el.tagName.toLowerCase() === 'img',
    );
    expect(favoriteImages).toHaveLength(1);
  });

  it('handles API errors gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false } as Response)),
    );

    render(<App />);
    await waitFor(() => expect(screen.getByText(/Error/i)).toBeInTheDocument());
  });

  it('handles aborted fetch correctly', async () => {
    const controller = new AbortController();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((_, reject) => {
            controller.abort();
            reject(new DOMException('Aborted', 'AbortError'));
          }),
      ),
    );

    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    );
  });
});
