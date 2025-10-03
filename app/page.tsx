import CharacterSelection from '@/components/character/character-selection';
import AppHeader from '@/components/app-header';
import { getCharacters } from '@/lib/api';

export default async function Home() {
  const [initialData1, initialData2] = await Promise.all([
    getCharacters(1),
    getCharacters(1),
  ]);

  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <AppHeader />

        <CharacterSelection
          initialData1={initialData1}
          initialData2={initialData2}
        />
      </div>
    </main>
  );
}
