import EpisodeSkeleton from './episode-skeleton';

const EpisodeGridSkeleton = () => {
  return (
    <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-4'>
      {Array.from({ length: 6 }).map((_, i) => (
        <EpisodeSkeleton key={i} />
      ))}
    </div>
  );
};

export default EpisodeGridSkeleton;
