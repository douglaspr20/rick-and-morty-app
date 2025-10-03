import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterColumn from '@/components/character/character-column';
import { CharacterResponse } from '@/interfaces';

const basePage1: CharacterResponse = {
  info: { count: 3, pages: 2, next: 'next-url', prev: null },
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

const page2Data: CharacterResponse = {
  info: { count: 3, pages: 2, next: null, prev: 'prev-url' },
  results: [
    {
      id: 3,
      name: 'Summer',
      status: 'Alive',
      species: 'Human',
      image: 'summer.jpg',
      episode: [],
    },
  ],
};

jest.mock('swr', () => {
  const impl = jest.fn((key: string) => {
    if (key.includes('&name=rick')) {
      return {
        data: { ...basePage1, results: [basePage1.results[0]] },
        error: undefined,
        isLoading: false,
      };
    }
    if (key.includes('page=2')) {
      return { data: page2Data, error: undefined, isLoading: false };
    }
    return { data: basePage1, error: undefined, isLoading: false };
  });
  return { __esModule: true, default: impl };
});

jest.mock('@/components/character/character-card', () => ({
  __esModule: true,
  default: ({ character, isSelected, onSelect }: any) => (
    <button
      type='button'
      data-testid={`char-${character.id}`}
      data-selected={isSelected}
      onClick={onSelect}
    >
      {character.name}
    </button>
  ),
}));

jest.mock('@/components/character/character-grid-skeleton', () => ({
  __esModule: true,
  default: () => <div data-testid='char-skel' />,
}));

describe('CharacterColumn', () => {
  const onSelect = jest.fn();

  const renderColumn = (
    override: Partial<React.ComponentProps<typeof CharacterColumn>> = {}
  ) =>
    render(
      <CharacterColumn
        title='Characters'
        selectedCharacterId={override.selectedCharacterId ?? null}
        onSelectCharacter={override.onSelectCharacter || onSelect}
        accentColor='primary'
        initialData={basePage1}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
    onSelect.mockClear();
  });

  it('renders initial results with pagination info', () => {
    renderColumn();
    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByText('Morty')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
  });

  it('selects a character when clicked', () => {
    renderColumn();
    fireEvent.click(screen.getByTestId('char-1'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('applies selected state when selectedCharacterId matches', () => {
    renderColumn({ selectedCharacterId: 2 });
    expect(screen.getByTestId('char-2').getAttribute('data-selected')).toBe(
      'true'
    );
  });

  it('navigates to next page and renders new data', () => {
    renderColumn();
    const buttons = screen.getAllByRole('button');
    const nextBtn = buttons[1]; // second pagination button (next)
    fireEvent.click(nextBtn);
    expect(screen.getByText('Summer')).toBeInTheDocument();
    expect(screen.queryByText('Morty')).not.toBeInTheDocument();
    expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument();
  });

  it('searches and resets to page 1', async () => {
    renderColumn();
    const input = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(input, { target: { value: 'rick' } });
    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
      expect(screen.queryByText('Morty')).not.toBeInTheDocument();
      expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
    });
  });

  it('disables prev button on first page', () => {
    renderColumn();
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('disables next button when there is no next page', () => {
    renderColumn();
    const buttons = screen.getAllByRole('button');
    const nextBtn = buttons[1];
    fireEvent.click(nextBtn);
    expect(nextBtn).toBeDisabled();
  });
});
