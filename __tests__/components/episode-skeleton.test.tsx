import { render } from '@testing-library/react';
import EpisodeSkeleton from '@/components/episode/episode-skeleton';

describe('EpisodeSkeleton', () => {
  it('renders skeleton structure', () => {
    const { container } = render(<EpisodeSkeleton />);
    const cardDiv = container.querySelector('.p-4.animate-pulse');
    expect(cardDiv).toBeTruthy();
    const placeholders = container.querySelectorAll('.bg-muted');
    expect(placeholders.length).toBeGreaterThanOrEqual(3);
  });
});
