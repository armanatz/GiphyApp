import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type { SingleGIFAPIResponse } from '../../@types/giphy';

const RANDOM_GIF_ENDPOINT = '/gifs/random';

const {
  EXPO_PUBLIC_GIPHY_API_URL: GIPHY_API_URL,
  EXPO_PUBLIC_GIPHY_API_KEY: GIPHY_API_KEY,
} = process.env;

export default function useRandomGIF(
  useQueryOptions: Omit<
    UseQueryOptions<SingleGIFAPIResponse, unknown, SingleGIFAPIResponse>,
    'queryKey' | 'queryFn'
  > = {},
) {
  async function getRandomGIF() {
    try {
      const req = await fetch(
        `${GIPHY_API_URL}${RANDOM_GIF_ENDPOINT}?api_key=${GIPHY_API_KEY}`,
      );
      const data = await req.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  return useQuery<SingleGIFAPIResponse>(
    ['randomGIF'],
    getRandomGIF,
    useQueryOptions,
  );
}
