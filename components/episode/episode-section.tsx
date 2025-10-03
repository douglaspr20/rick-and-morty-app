'use client';

import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Card } from '../ui/card';
import EpisodeGridSkeleton from './episode-skeleton';
import { Character, Episode } from '@/interfaces';
import { API_URL, getEpisodes } from '@/lib/api';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type EpisodeType = 'only1' | 'shared' | 'only2';

interface Props {
  title: string;
  character1Id: number | null;
  character2Id: number | null;
  type: EpisodeType;
}

const EpisodeSection: FC<Props> = ({
  title,
  character1Id,
  character2Id,
  type,
}) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: char1, isLoading: isLoadingChar1 } = useSWR<Character>(
    character1Id ? `${API_URL}/character/${character1Id}` : null,
    fetcher
  );

  const { data: char2, isLoading: isLoadingChar2 } = useSWR<Character>(
    character2Id ? `${API_URL}/character/${character2Id}` : null,
    fetcher
  );

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (type === 'only1' && !char1) {
        setEpisodes([]);
        return;
      }
      if (type === 'only2' && !char2) {
        setEpisodes([]);
        return;
      }
      if (type === 'shared' && (!char1 || !char2)) {
        setEpisodes([]);
        return;
      }

      setLoading(true);

      try {
        let episodeUrls: string[] = [];

        if (type === 'only1' && char1) {
          const char2Episodes = char2?.episode || [];
          episodeUrls = char1.episode.filter(
            (ep) => !char2Episodes.includes(ep)
          );
        } else if (type === 'only2' && char2) {
          const char1Episodes = char1?.episode || [];
          episodeUrls = char2.episode.filter(
            (ep) => !char1Episodes.includes(ep)
          );
        } else if (type === 'shared' && char1 && char2) {
          episodeUrls = char1.episode.filter((ep) =>
            char2.episode.includes(ep)
          );
        }

        if (episodeUrls.length === 0) {
          setEpisodes([]);
          setLoading(false);
          return;
        }

        const episodeIds = episodeUrls
          .map((url) => url.split('/').pop())
          .join(',');

        const data = await getEpisodes(episodeIds);
        setEpisodes(data);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [char1, char2, type]);

  const shouldShow =
    (type === 'only1' && character1Id) ||
    (type === 'only2' && character2Id) ||
    (type === 'shared' && character1Id && character2Id);

  if (!shouldShow) {
    return (
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold text-accent'>{title}</h2>
        <Card className='p-8 text-center'>
          <p className='text-muted-foreground'>
            {type === 'shared'
              ? 'Select both characters to see shared episodes'
              : `Select a character to see their exclusive episodes`}
          </p>
        </Card>
      </div>
    );
  }

  let content;

  if (loading || isLoadingChar1 || isLoadingChar2) {
    content = <EpisodeGridSkeleton />;
  } else if (episodes.length === 0) {
    content = (
      <Card className='p-8 text-center'>
        <p className='text-muted-foreground'>No episodes found</p>
      </Card>
    );
  } else {
    content = (
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto'>
        {episodes.map((episode) => (
          <Card
            key={episode.id}
            className='p-4 hover:shadow-lg transition-shadow'
          >
            <div className='space-y-2'>
              <div className='flex items-start justify-between gap-2'>
                <h3 className='font-bold text-sm leading-tight'>
                  {episode.name}
                </h3>
                <span className='text-xs text-primary font-mono shrink-0'>
                  {episode.episode}
                </span>
              </div>
              <p className='text-sm text-muted-foreground'>
                {episode.air_date}
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold text-accent'>{title}</h2>
      {content}
    </div>
  );
};

export default EpisodeSection;
