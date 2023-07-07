import { apiRequest } from '@/utils/apiRequest';

export const fetchPokemonList = async (params: any) => {
  if (params.type) {
    const response = await apiRequest({ path: `/type/${params.type}`, method: 'GET' });
    return (response.data.pokemon || []).map((item: any) => item.pokemon);
  } else {
    const response = await apiRequest({ path: '/pokemon', method: 'GET', params });
    return response.data.results;
  }
};

export const getPokemonByNameApi = async (name: string) => {
  const response = await apiRequest({ path: `/pokemon/${name}`, method: 'GET' });
  return response.data;
};

export const getTypesApi = async () => {
  const response = await apiRequest({ path: '/type', method: 'GET' });
  return response.data.results;
};
