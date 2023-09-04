import { rest } from 'msw';

import {
  GIPHY_API_RANDOM_ENDPOINT,
  GIPHY_API_SEARCH_ENDPOINT,
  GIPHY_GIF_TITLE,
  GIPHY_GIF_LONG_URL,
  GIPHY_GIF_SHORT_URL,
  GIPHY_GIF_RATING,
} from './constants';

const dummyGIF = {
  id: '3o6ZtnR6i9kZqUc4o0',
  title: GIPHY_GIF_TITLE,
  url: GIPHY_GIF_LONG_URL,
  bitly_url: GIPHY_GIF_SHORT_URL,
  rating: GIPHY_GIF_RATING,
  images: {
    original: {
      url: 'https://media4.giphy.com/media/3o6ZtnR6i9kZqUc4o0/giphy.gif?cid=bbf89e01c4d197c20d2ed1f849abe67cd124f75ce7291f74&ep=v1_gifs_random&rid=giphy.gif&ct=g',
      webp: 'https://media4.giphy.com/media/3o6ZtnR6i9kZqUc4o0/giphy.webp?cid=bbf89e01c4d197c20d2ed1f849abe67cd124f75ce7291f74&ep=v1_gifs_random&rid=giphy.webp&ct=g',
    },
    fixed_height_small_still: {
      url: 'https://media4.giphy.com/media/3o6ZtnR6i9kZqUc4o0/100_s.gif?cid=bbf89e01c4d197c20d2ed1f849abe67cd124f75ce7291f74&ep=v1_gifs_random&rid=100_s.gif&ct=g',
    },
  },
};

export const handlers = [
  rest.get(GIPHY_API_RANDOM_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ data: dummyGIF })),
  ),
  rest.get(GIPHY_API_SEARCH_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ data: [dummyGIF, dummyGIF] })),
  ),
];
