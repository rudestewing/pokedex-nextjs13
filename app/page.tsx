'use client';

import { fetchPokemonList, getTypesApi } from '@/api';
import PokemonListItem from '@/components/PokemonListItem';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Button, Drawer, Form, Radio } from 'antd';
import { useCallback, useMemo, useState } from 'react';

const limit = 20;

export default function Home() {
  const [formFilter] = Form.useForm();

  const [showedFilter, setShowedFilter] = useState(false);
  const [filter, setFilter] = useState({
    type: '',
  });

  const hasFilter = useMemo(() => {
    return !!filter.type;
  }, [filter]);

  const { data: types } = useQuery(['types'], () => getTypesApi());

  const { hasNextPage, fetchNextPage, data, isLoading, refetch, remove, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['pokemon-list', filter],
      queryFn: (context) => {
        return fetchPokemonList({
          ...filter,
          offset: context.pageParam || 0,
        });
      },
      getNextPageParam: (lastPage, allPages) => {
        if ((lastPage || []).length >= limit && !filter.type) {
          const params = (allPages || []).flat().length;
          return params;
        } else {
          return undefined;
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {},
    });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const handleShowedFilter = useCallback(
    (isVisible: boolean) => () => setShowedFilter(isVisible),
    []
  );

  const handleApplyFilter = useCallback((values: any) => {
    setFilter((state) => ({ ...state, type: values.type }));
    setShowedFilter(false);
  }, []);

  return (
    <>
      <div className="py-4 max-w-screen-md mx-auto flex flex-col gap-2">
        <div className="flex justify-end">
          <Button onClick={handleShowedFilter(true)} type={hasFilter ? 'primary' : 'default'}>
            Filter
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
          {(data?.pages || []).map((page: any) => {
            return page.map((item: any) => {
              return <PokemonListItem pokemon={item} key={item.name} />;
            });
          })}
        </div>
        {hasNextPage && (
          <div className="flex justify-center p-4">
            <Button loading={isLoading || isFetchingNextPage} onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
      <Drawer
        placement="right"
        open={showedFilter}
        footer={
          <div className="flex gap-1 justify-end">
            <Button onClick={() => formFilter.submit()}>
              <span>Apply</span>
            </Button>
          </div>
        }
        onClose={handleShowedFilter(false)}
      >
        <div>
          <Form
            form={formFilter}
            onFinish={handleApplyFilter}
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
          >
            <Form.Item label="Pokemon Type" name="type">
              <Radio.Group
                optionType="button"
                options={[
                  { key: 0, value: '', label: 'All' },
                  ...(types || []).map((item: any) => {
                    return {
                      key: item.name,
                      value: item.name,
                      label: item.name,
                    };
                  }),
                ]}
              />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
}
