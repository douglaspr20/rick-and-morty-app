jest.mock('swr', () => {
  const cache = new Map<string, any>();
  const impl = jest.fn((key: string | null) => {
    if (!key) return { data: undefined, error: undefined, isLoading: false };
    if (cache.has(key)) return cache.get(key);

    let value;
    if (key.includes('character/1')) {
      value = {
        data: {
          id: 1,
          name: 'Rick',
          episode: [`${API_URL}/episode/1`, `${API_URL}/episode/2`],
        },
        error: undefined,
        isLoading: false,
      };
    } else if (key.includes('character/2')) {
      value = {
        data: {
          id: 2,
          name: 'Morty',
          episode: [`${API_URL}/episode/1`, `${API_URL}/episode/3`],
        },
        error: undefined,
        isLoading: false,
      };
    } else {
      value = { data: undefined, error: undefined, isLoading: false };
    }

    cache.set(key, value);
    return value;
  });
  return { __esModule: true, default: impl };
});

jest.mock('@/lib/api', () => {
  return {
    API_URL: 'https://rickandmortyapi.com/api',
    getEpisodes: jest.fn((ids: string) => {
      if (!ids) return Promise.resolve([]);
      return Promise.resolve([
        {
          id: 1,
          name: 'Pilot',
          air_date: 'December 2, 2013',
          episode: 'S01E01',
        },
        {
          id: 2,
          name: 'Lawnmower Dog',
          air_date: 'December 9, 2013',
          episode: 'S01E02',
        },
      ]);
    }),
  };
});

import { render, screen, waitFor } from '@testing-library/react';
import EpisodeSection from '@/components/episode/episode-section';
import { API_URL } from '@/lib/api';

describe('EpisodeSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders placeholder when no character is selected (only1)', () => {
    render(
      <EpisodeSection
        title='Test Section'
        character1Id={null}
        character2Id={null}
        type='only1'
      />
    );

    const placeholders = screen.getAllByText(
      'Select a character to see their exclusive episodes'
    );
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it('renders placeholder when only one character is selected (shared)', () => {
    render(
      <EpisodeSection
        title='Test Section'
        character1Id={1}
        character2Id={null}
        type='shared'
      />
    );

    expect(
      screen.getByText('Select both characters to see shared episodes')
    ).toBeInTheDocument();
  });

  it('fetches and displays episodes when character is selected (only1)', async () => {
    render(
      <EpisodeSection
        title='Test Section'
        character1Id={1}
        character2Id={null}
        type='only1'
      />
    );

    await waitFor(
      () => {
        expect(screen.getByText('Pilot')).toBeInTheDocument();
        expect(screen.getByText('S01E01')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('shows "No episodes found" when character has no exclusive episodes', async () => {
    const swr = require('swr');
    const stableRick = {
      data: {
        id: 1,
        name: 'Rick',
        episode: [`${API_URL}/episode/1`],
      },
      error: undefined,
      isLoading: false,
    };
    const stableMorty = {
      data: {
        id: 2,
        name: 'Morty',
        episode: [`${API_URL}/episode/1`],
      },
      error: undefined,
      isLoading: false,
    };
    swr.default.mockImplementation((key: string | null) => {
      if (!key) return { data: undefined, error: undefined, isLoading: false };
      if (key.includes('character/1')) return stableRick;
      if (key.includes('character/2')) return stableMorty;
      return { data: undefined, error: undefined, isLoading: false };
    });

    render(
      <EpisodeSection
        title='Test Section'
        character1Id={1}
        character2Id={2}
        type='only1'
      />
    );

    await waitFor(
      () => {
        expect(screen.getByText('No episodes found')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('handles fetch error gracefully', async () => {
    const api = require('@/lib/api');
    api.getEpisodes.mockImplementation(() => {
      throw new Error('Failed to fetch episodes');
    });

    render(
      <EpisodeSection
        title='Test Section'
        character1Id={1}
        character2Id={null}
        type='only1'
      />
    );

    await waitFor(
      () => {
        expect(screen.getByText('No episodes found')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
