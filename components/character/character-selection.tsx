'use client';

import { FC, useState } from 'react';
import CharacterColumn from './character-column';
import EpisodeSection from '../episode/episode-section';
import { CharacterResponse } from '@/interfaces';

interface Props {
  initialData1: CharacterResponse;
  initialData2: CharacterResponse;
}

const CharacterSelection: FC<Props> = ({ initialData1, initialData2 }) => {
  const [selectedCharacter1, setSelectedCharacter1] = useState<number | null>(
    null
  );
  const [selectedCharacter2, setSelectedCharacter2] = useState<number | null>(
    null
  );

  return (
    <>
      {/* Character Selection Grid */}
      <div className='grid md:grid-cols-2 gap-6 mb-12'>
        <CharacterColumn
          title='Character #1'
          selectedCharacterId={selectedCharacter1}
          onSelectCharacter={setSelectedCharacter1}
          accentColor='primary'
          initialData={initialData1}
        />
        <CharacterColumn
          title='Character #2'
          selectedCharacterId={selectedCharacter2}
          onSelectCharacter={setSelectedCharacter2}
          accentColor='secondary'
          initialData={initialData2}
        />
      </div>

      {/* Episode Sections */}
      <div className='grid md:grid-cols-3 gap-6'>
        <EpisodeSection
          title='Character #1 - Only Episodes'
          character1Id={selectedCharacter1}
          character2Id={null}
          type='only1'
        />
        <EpisodeSection
          title='Character #1 & Character #2 - Shared Episodes'
          character1Id={selectedCharacter1}
          character2Id={selectedCharacter2}
          type='shared'
        />
        <EpisodeSection
          title='Character #2 - Only Episodes'
          character1Id={null}
          character2Id={selectedCharacter2}
          type='only2'
        />
      </div>
    </>
  );
};

export default CharacterSelection;
