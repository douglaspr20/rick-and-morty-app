import { CharacterResponse } from '@/interfaces';
import { Episode } from '@/interfaces/episode.interface';

export const API_URL = process.env.API_URL || 'https://rickandmortyapi.com/api';

export async function getCharacters(page = 1): Promise<CharacterResponse> {
  try {
    const response = await fetch(`${API_URL}/character?page=${page}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}

export async function getEpisodes(episodeIds: string): Promise<Episode[]> {
  try {
    const response = await fetch(`${API_URL}/episode/${episodeIds}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
}
