import { getPokemonByNameApi } from '@/api';
import { COLOR_TYPES } from '@/constants/pokemon-color-schemes';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface PokemonListItemProperties {
  pokemon: any;
}

const PokemonListItem: React.FC<PokemonListItemProperties> = ({ pokemon }) => {
  const { name } = pokemon;

  const { data, isLoading } = useQuery(['pokemon-detail', name], () => getPokemonByNameApi(name), {
    // enabled: false,
  });

  const backgroundColor = useMemo(() => {
    if (data) {
      const { types } = data;
      if (types.length > 1) {
        const gradients: string[] = types.map((item: any) => {
          const { type } = item;
          return COLOR_TYPES[type.name];
        });

        return `linear-gradient(to bottom right, ${gradients.join(', ')})`;
      } else {
        return COLOR_TYPES[types[0].type.name];
      }
    }

    return 'white';
  }, [data]);

  const { id, sprites, types } = data || {};

  return (
    <Link href={`/pokemon/${name}`} className="no-underline block">
      <div className="block rounded-lg border border-gray-200 shadow-md h-[230px] relative no-underline hover:shadow-lg hover:border-blue-700">
        {!!data && (
          <>
            <div
              className="p-3 rounded-t-md relative h-[120px]"
              style={{
                background: backgroundColor,
              }}
            >
              <div className="w-[140px] h-[140px] my-auto absolute top-[5px] right-[30px] mx-auto">
                <img
                  src={sprites?.other['official-artwork']?.front_default}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 bg-white pt-8 px-3 h-[60px]">
              {!!data && (
                <>
                  <div className="flex gap-2 justify-between">
                    <span className="tracking-wide font-semibold">{name}</span>
                    <span className="font-semibold text-gray-500"># {id}</span>
                  </div>
                  <div className="flex gap-1">
                    {types.map((item: any) => {
                      return (
                        <span
                          key={`${name}-${item.type.name}`}
                          className="px-3 py-1 rounded-full text-white text-xs"
                          style={{ backgroundColor: COLOR_TYPES[item.type.name] }}
                        >
                          {item.type.name}
                        </span>
                      );
                    })}
                  </div>
                </>
              )}
              {/* <div className="flex justify-end absolute right-[10px] bottom-[10px]">
              <Link
                className="text-sm rounded-lg bg-blue-700 text-white px-3 py-1 flex items-center gap-1"
                href={`/pokemon/${name}`}
              >
                <span>Detail</span>
                <ArrowRightOutlined size={14} />
              </Link>
            </div> */}
            </div>
          </>
        )}
        {isLoading && !data && (
          <div className="w-full h-full flex items-center justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PokemonListItem;
