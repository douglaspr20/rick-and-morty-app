import { API_URL, getCharacters, getEpisodes } from '@/lib/api';

global.fetch = jest.fn();

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('fetches characters successfully', async () => {
      const mockResponse = {
        info: { count: 826, pages: 42, next: 'next-url', prev: null },
        results: [
          {
            id: 1,
            name: 'Rick',
            status: 'Alive',
            species: 'Human',
            image: 'image.jpg',
            episode: [],
          },
        ],
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getCharacters(1);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/character?page=1`,
        expect.any(Object)
      );
    });

    it('throws error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getCharacters(1)).rejects.toThrow(
        'Failed to fetch characters'
      );
    });
  });

  describe('getEpisodes', () => {
    it('fetches multiple episodes successfully', async () => {
      const mockEpisodes = [
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
      ];
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEpisodes,
      });

      const result = await getEpisodes('1,2');
      expect(result).toEqual(mockEpisodes);
    });

    it('handles single episode response', async () => {
      const mockEpisode = {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEpisode,
      });

      const result = await getEpisodes('1');
      expect(result).toEqual([mockEpisode]);
    });
  });
});
