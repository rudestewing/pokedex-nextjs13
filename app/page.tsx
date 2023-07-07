'use client';

import { fetchPokemonList } from '@/api';
import PokemonListItem from '@/components/PokemonListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useCallback, useState } from 'react';

export default function Home() {
  const filter = {
    limit: 20,
  };

  const { hasNextPage, fetchNextPage, data, isLoading } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: (context) => {
      console.log('ctx', context);
      return fetchPokemonList({
        offset: context.pageParam || 0,
        limit: filter.limit,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if ((lastPage || []).length === filter.limit) {
        const params = (allPages || []).flat().length;
        console.log('params', params);
        return params;
      } else {
        return undefined;
      }
    },
    getPreviousPageParam: (firstPage, allPages) => {},
  });

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <div className="py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-screen-md mx-auto">
        {(data?.pages || []).map((page: any) => {
          return page.map((item: any) => {
            return <PokemonListItem pokemon={item} key={item.name} />;
          });
        })}
      </div>
      <div className="flex justify-center p-4">
        <button
          type="button"
          onClick={handleLoadMore}
          className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md"
          disabled={isLoading}
        >
          load more
        </button>
      </div>
    </div>
  );
}
