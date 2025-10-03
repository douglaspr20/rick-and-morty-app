import { render, screen } from '@testing-library/react';
import type { CharacterResponse } from '@/interfaces';

jest.mock('@/lib/api', () => ({
  getCharacters: jest.fn(async () => mockCharacters),
}));

const characterSelectionMock = jest.fn();
jest.mock('@/components/character/character-selection', () => ({
  __esModule: true,
  default: (props: any) => {
    characterSelectionMock(props);
    return <div data-testid='character-selection-stub' />;
  },
}));

jest.mock('@/components/theme-toggle', () => ({
  __esModule: true,
  default: () => <div data-testid='theme-toggle-stub' />,
}));

const mockCharacters: CharacterResponse = {
  info: { count: 2, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: 'rick.jpg',
      episode: [],
    },
    {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      image: 'morty.jpg',
      episode: [],
    },
  ],
};

describe('Home page (app/page.tsx)', () => {
  afterEach(() => {
    characterSelectionMock.mockClear();
    jest.resetModules();
  });

  it('renders header and passes initial character data to CharacterSelection', async () => {
    const { default: Home } = await import('@/app/page');
    const element = await Home();
    render(element);

    expect(screen.getByText(/Rick/)).toBeInTheDocument();
    expect(screen.getByText(/Morty/)).toBeInTheDocument();
    expect(
      screen.getByText(/Compare your favorite characters/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle-stub')).toBeInTheDocument();

    expect(characterSelectionMock).toHaveBeenCalledTimes(1);
    const callArgs = characterSelectionMock.mock.calls[0][0];
    expect(callArgs.initialData1).toEqual(mockCharacters);
    expect(callArgs.initialData2).toEqual(mockCharacters);
  });

  it('calls getCharacters twice for initial data', async () => {
    const { getCharacters } = await import('@/lib/api');
    const { default: Home } = await import('@/app/page');
    const element = await Home();
    render(element);
    expect(
      (getCharacters as jest.Mock).mock.calls.filter((c) => c[0] === 1).length
    ).toBe(2);
  });
});
