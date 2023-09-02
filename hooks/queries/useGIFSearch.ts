import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type { MultiGIFAPIResponse } from '../../@types/giphy';

const SEARCH_GIF_ENDPOINT = '/gifs/search';

const {
  EXPO_PUBLIC_GIPHY_API_URL: GIPHY_API_URL,
  EXPO_PUBLIC_GIPHY_API_KEY: GIPHY_API_KEY,
} = process.env;

export default function useGIFSearch(
  { searchQuery = '', offset = 0, limit = 25 },
  useQueryOptions: Omit<
    UseQueryOptions<MultiGIFAPIResponse, unknown, MultiGIFAPIResponse>,
    'queryKey' | 'queryFn'
  > = {},
) {
  async function searchGIF() {
    const queryParamList = [
      `?api_key=${GIPHY_API_KEY}`,
      `&q=${searchQuery}`,
      `&limit=${limit}`,
      `&offset=${offset}`,
    ];

    try {
      const req = await fetch(
        `${GIPHY_API_URL}${SEARCH_GIF_ENDPOINT}${queryParamList.join('')}`,
      );
      const data = await req.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  return useQuery<MultiGIFAPIResponse>(
    ['gifSearchResults', { searchQuery, offset, limit }],
    searchGIF,
    useQueryOptions,
  );
}
