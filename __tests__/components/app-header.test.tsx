import { render, screen } from '@testing-library/react';
import AppHeader from '@/components/app-header';

jest.mock('@/components/theme-toggle', () => ({
  __esModule: true,
  default: () => <div data-testid='theme-toggle' />,
}));

describe('AppHeader', () => {
  it('renders default header content', () => {
    render(<AppHeader />);
    expect(screen.getByText(/Rick/)).toBeInTheDocument();
    expect(screen.getByText(/Morty/)).toBeInTheDocument();
    expect(
      screen.getByText(/Compare your favorite characters/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('renders custom props', () => {
    render(
      <AppHeader
        titlePrimary='Bird'
        titleSecondary='Person'
        subtitle='Test subtitle'
      />
    );
    expect(screen.getByText(/Bird/)).toBeInTheDocument();
    expect(screen.getByText(/Person/)).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });
});
