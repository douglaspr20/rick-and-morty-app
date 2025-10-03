import { Card } from '../ui/card';

const EpisodeSkeleton = () => {
  return (
    <Card className='p-4 animate-pulse'>
      <div className='space-y-2'>
        <div className='flex items-start justify-between gap-2'>
          <div className='h-4 bg-muted rounded w-3/4' />
          <div className='h-3 bg-muted rounded w-12' />
        </div>
        <div className='h-3 bg-muted rounded w-1/2' />
      </div>
    </Card>
  );
};

export default EpisodeSkeleton;
