'use client';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '@/components/character/character-card';
import { jest } from '@jest/globals';
import { API_URL } from '@/lib/api';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: `${API_URL}/character/avatar/1.jpeg`,
  episode: ['episode1', 'episode2'],
};

describe('CharacterCard', () => {
  it('renders character information correctly', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        onSelect={() => {}}
        accentColor='primary'
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        onSelect={onSelect}
        accentColor='primary'
      />
    );

    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('applies selected styles when isSelected is true', () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isSelected={true}
        onSelect={() => {}}
        accentColor='primary'
      />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('ring-2', 'ring-primary');
  });

  it('displays correct status color for alive character', () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        onSelect={() => {}}
        accentColor='primary'
      />
    );

    const statusIndicator = container.querySelector('.bg-primary');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('displays correct status color for dead character', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    const { container } = render(
      <CharacterCard
        character={deadCharacter}
        isSelected={false}
        onSelect={() => {}}
        accentColor='primary'
      />
    );

    const statusIndicator = container.querySelector('.bg-destructive');
    expect(statusIndicator).toBeInTheDocument();
  });
});
