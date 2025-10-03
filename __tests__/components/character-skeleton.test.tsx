import { render } from '@testing-library/react';
import CharacterGridSkeleton from '@/components/character/character-grid-skeleton';
import CharacterSkeleton from '@/components/character/character-skeleton';

describe('CharacterSkeleton', () => {
  it('renders skeleton card with animation', () => {
    const { container } = render(<CharacterSkeleton />);
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });
});

describe('CharacterGridSkeleton', () => {
  it('renders 9 skeleton cards in grid', () => {
    const { container } = render(<CharacterGridSkeleton />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(9);
  });

  it('renders grid layout', () => {
    const { container } = render(<CharacterGridSkeleton />);
    const grid = container.querySelector('.grid-cols-3');
    expect(grid).toBeInTheDocument();
  });
});
