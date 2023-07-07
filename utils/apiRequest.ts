import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

interface APIRequestConfig {
  path: string;
  method: 'GET' | 'POST';
  params?: object;
}

export const apiRequest = (config: APIRequestConfig) => {
  const { path, method, params } = config;
  return instance.request({
    url: path,
    method,
    params,
  });
};
