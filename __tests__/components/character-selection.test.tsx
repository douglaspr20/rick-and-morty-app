import { render, screen } from '@testing-library/react';
import CharacterSelection from '@/components/character/character-selection';
import { API_URL } from '@/lib/api';

const mockInitialData = {
  info: { count: 826, pages: 42, next: 'next-url', prev: null },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: `${API_URL}/character/avatar/1.jpeg`,
      episode: ['ep1', 'ep2'],
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      image: `${API_URL}/character/avatar/2.jpeg`,
      episode: ['ep1', 'ep3'],
    },
  ],
};

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: undefined,
    error: undefined,
    isLoading: false,
  })),
}));

describe('CharacterSelection', () => {
  it('renders both character columns', () => {
    render(
      <CharacterSelection
        initialData1={mockInitialData}
        initialData2={mockInitialData}
      />
    );

    expect(screen.getByText('Character #1')).toBeInTheDocument();
    expect(screen.getByText('Character #2')).toBeInTheDocument();
  });

  it('renders all three episode sections', () => {
    render(
      <CharacterSelection
        initialData1={mockInitialData}
        initialData2={mockInitialData}
      />
    );

    expect(
      screen.getByText('Character #1 - Only Episodes')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Character #1 & Character #2 - Shared Episodes')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Character #2 - Only Episodes')
    ).toBeInTheDocument();
  });

  it('shows placeholder messages when no characters are selected', () => {
    render(
      <CharacterSelection
        initialData1={mockInitialData}
        initialData2={mockInitialData}
      />
    );

    const placeholderelements = screen.getAllByText(
      'Select a character to see their exclusive episodes'
    );

    expect(placeholderelements.length).toBe(2);

    expect(
      screen.getByText('Select both characters to see shared episodes')
    ).toBeInTheDocument();
  });
});
