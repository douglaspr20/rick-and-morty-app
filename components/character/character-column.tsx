'use client';

import { FC, useState } from 'react';
import useSWR from 'swr';
import CharacterCard from './character-card';
import CharacterGridSkeleton from './character-grid-skeleton';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { CharacterResponse } from '@/interfaces';
import { API_URL } from '@/lib/api';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  title: string;
  selectedCharacterId: number | null;
  onSelectCharacter: (id: number) => void;
  accentColor: 'primary' | 'secondary';
  initialData: CharacterResponse;
}

const CharacterColumn: FC<Props> = ({
  title,
  selectedCharacterId,
  onSelectCharacter,
  accentColor,
  initialData,
}) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const apiUrl = `${API_URL}/character?page=${page}${
    searchQuery ? `&name=${encodeURIComponent(searchQuery)}` : ''
  }`;

  const { data, error, isLoading } = useSWR<CharacterResponse>(
    apiUrl,
    fetcher,
    {
      fallbackData: page === 1 && !searchQuery ? initialData : undefined,
      revalidateOnFocus: false,
    }
  );

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (data?.info.next) setPage(page + 1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className={`text-2xl font-bold text-${accentColor}`}>{title}</h2>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={handlePrevPage}
            disabled={page === 1 || isLoading}
            className='hover:dark:text-amber-300'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className='text-sm text-muted-foreground min-w-[80px] text-center'>
            Page {page} of {data?.info?.pages || '...'}
          </span>
          <Button
            variant='outline'
            size='icon'
            onClick={handleNextPage}
            disabled={!data?.info?.next || isLoading}
            className='hover:dark:text-amber-300'
          >
            <ChevronRight className='h-4 w-4 ' />
          </Button>
        </div>
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          type='text'
          placeholder='Search characters...'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className='pl-9'
        />
      </div>

      <div className='max-h-[600px] overflow-y-auto pr-2'>
        {isLoading ? (
          <CharacterGridSkeleton />
        ) : (
          <>
            {error || data?.error ? (
              <div className='text-center py-8 text-destructive'>
                {data?.error || 'Failed to load characters'}
              </div>
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
                {data?.results?.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isSelected={selectedCharacterId === character.id}
                    onSelect={() => onSelectCharacter(character.id)}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterColumn;
