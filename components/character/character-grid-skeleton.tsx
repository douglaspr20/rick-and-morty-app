import CharacterSkeleton from './character-skeleton';

const CharacterGridSkeleton = () => {
  return (
    <div className='grid grid-cols-3 gap-3'>
      {Array.from({ length: 9 }).map((_, i) => (
        <CharacterSkeleton key={i} />
      ))}
    </div>
  );
};

export default CharacterGridSkeleton;
