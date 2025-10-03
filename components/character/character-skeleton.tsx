import { Card } from '../ui/card';

const CharacterSkeleton = () => {
  return (
    <Card className='p-4 animate-pulse'>
      <div className='flex gap-4'>
        <div className='w-20 h-20 rounded-lg bg-muted' />
        <div className='flex-1 space-y-2'>
          <div className='h-5 bg-muted rounded w-3/4' />
          <div className='h-4 bg-muted rounded w-1/2' />
          <div className='h-4 bg-muted rounded w-2/3' />
        </div>
      </div>
    </Card>
  );
};

export default CharacterSkeleton;
