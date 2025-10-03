import ThemeToggle from '@/components/theme-toggle';
import { FC } from 'react';

interface Props {
  titlePrimary?: string;
  titleSecondary?: string;
  subtitle?: string;
}

const AppHeader: FC<Props> = ({
  titlePrimary = 'Rick',
  titleSecondary = 'Morty',
  subtitle = 'Compare your favorite characters and discover their shared adventures',
}) => {
  return (
    <header className='mb-12 text-center relative'>
      <div className='absolute right-0 top-0'>
        <ThemeToggle />
      </div>
      <h1 className='text-5xl md:text-7xl font-bold mb-4 text-balance'>
        <span className='text-primary'>{titlePrimary}</span> and{' '}
        <span className='text-secondary'>{titleSecondary}</span>
      </h1>
      <p className='text-lg text-muted-foreground text-pretty'>{subtitle}</p>
    </header>
  );
};

export default AppHeader;
