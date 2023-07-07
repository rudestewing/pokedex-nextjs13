import { apiRequest } from '@/utils/apiRequest';

export const fetchPokemonList = async (params: object) => {
  const response = await apiRequest({ path: '/pokemon', method: 'GET', params });
  return response.data.results;
};

export const getPokemonByNameApi = async (name: string) => {
  const response = await apiRequest({ path: `/pokemon/${name}`, method: 'GET' });
  return response.data;
};
