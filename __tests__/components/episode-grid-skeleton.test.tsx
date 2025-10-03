import { render, screen } from '@testing-library/react';
import EpisodeGridSkeleton from '@/components/episode/episode-grid-skeleton';

jest.mock('@/components/episode/episode-skeleton', () => ({
  __esModule: true,
  default: () => <div data-testid='episode-skel' />,
}));

describe('EpisodeGridSkeleton', () => {
  it('renders 6 episode skeleton items', () => {
    render(<EpisodeGridSkeleton />);
    const items = screen.getAllByTestId('episode-skel');
    expect(items).toHaveLength(6);
  });

  it('wraps skeletons in a grid container with expected classes', () => {
    const { container } = render(<EpisodeGridSkeleton />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
    expect(grid.className).toMatch(/grid/);
    expect(grid.className).toMatch(/gap-4/);
  });
});
