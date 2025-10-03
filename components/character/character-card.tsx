'use client';

import { FC } from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { Character } from '@/interfaces';
import Image from 'next/image';

interface Props {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
  accentColor: 'primary' | 'secondary';
}

const CharacterCard: FC<Props> = ({
  character,
  isSelected,
  onSelect,
  accentColor,
}) => {
  const statusColor =
    {
      Alive: 'bg-primary',
      Dead: 'bg-destructive',
      unknown: 'bg-muted-foreground',
    }[character.status] || 'bg-muted-foreground';

  return (
    <Card
      className={cn(
        'p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg',
        isSelected &&
          accentColor === 'primary' &&
          'ring-2 ring-primary bg-primary/5',
        isSelected &&
          accentColor === 'secondary' &&
          'ring-2 ring-secondary bg-secondary/5'
      )}
      onClick={onSelect}
    >
      <div className='flex gap-4'>
        <Image
          src={character.image || '/placeholder.svg'}
          alt={character.name}
          className='w-20 h-20 rounded-lg object-cover'
          width={80}
          height={80}
        />
        <div className='flex-1 min-w-0'>
          <h3 className='font-bold text-lg truncate mb-2'>{character.name}</h3>
          <div className='flex items-center gap-2 mb-1'>
            <div className={cn('w-2 h-2 rounded-full', statusColor)} />
            <span className='text-sm text-muted-foreground'>
              {character.status}
            </span>
          </div>
          <p className='text-sm text-muted-foreground'>{character.species}</p>
        </div>
      </div>
    </Card>
  );
};

export default CharacterCard;
