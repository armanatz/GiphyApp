import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { Alert } from 'react-native';

import AppNavigator from '../../AppNavigator';

import { renderTitleOrUrl } from '../../utils';

import { mswJest } from '../../mocks/api/server.jest';

import {
  GIPHY_API_RANDOM_ENDPOINT,
  GIPHY_GIF_TITLE,
  GIPHY_GIF_LONG_URL,
  GIPHY_GIF_SHORT_URL,
  GIPHY_GIF_RATING,
} from '../../mocks/api/constants';

type AllScreensProps = {
  queryClient?: QueryClient;
};

function AllScreens({ queryClient = new QueryClient() }: AllScreensProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

describe('rendering elements', () => {
  it('renders with search bar as button', () => {
    render(<AllScreens />);

    const searchBarAsButton = screen.getByText('Search');
    const searchBarAsInput = screen.queryByPlaceholderText('Search');

    expect(searchBarAsButton).toBeOnTheScreen();
    expect(searchBarAsInput).not.toBeOnTheScreen();
  });

  it('renders a skeleton on initial load', () => {
    render(<AllScreens />);

    const skeleton = screen.getByLabelText('GIF loading animation');

    expect(skeleton).toBeOnTheScreen();
  });
});

describe('rendering meta data', () => {
  let preparedData: Record<string, any>;

  beforeEach(() => {
    preparedData = {
      data: {
        title: '',
        bitly_url: '',
        url: '',
        rating: '',
        images: { original: { webp: '' } },
      },
    };
  });

  it('renders gif title, short url, and rating from API', async () => {
    render(<AllScreens />);

    const title = await screen.findByText(GIPHY_GIF_TITLE);
    expect(title).toBeOnTheScreen();

    const shortUrl = screen.getByText(GIPHY_GIF_SHORT_URL);
    const rating = screen.getByText(GIPHY_GIF_RATING.toLocaleUpperCase());

    expect(shortUrl).toBeOnTheScreen();
    expect(rating).toBeOnTheScreen();
  });

  it('renders fallback gif title and rating if missing from API', async () => {
    mswJest.use(
      rest.get(GIPHY_API_RANDOM_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(preparedData)),
      ),
    );

    render(<AllScreens />);

    const title = await screen.findByText('GIF has no title');
    expect(title).toBeOnTheScreen();

    const rating = screen.getByText('N/A');
    expect(rating).toBeOnTheScreen();
  });

  it('renders long url if short url is missing from API', async () => {
    preparedData.data.url = GIPHY_GIF_LONG_URL;

    mswJest.use(
      rest.get(GIPHY_API_RANDOM_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(preparedData)),
      ),
    );

    render(<AllScreens />);

    const longUrl = await screen.findByText(
      renderTitleOrUrl({ type: 'url', text: GIPHY_GIF_LONG_URL }),
    );

    expect(longUrl).toBeOnTheScreen();
  });
});

describe('error handling', () => {
  it('displays an alert if getting random GIF errors out', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity,
        },
      },
      logger: {
        log: console.log,
        warn: console.warn,
        error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
      },
    });

    mswJest.use(
      rest.get(GIPHY_API_RANDOM_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(500)),
      ),
    );

    jest.spyOn(Alert, 'alert');

    render(<AllScreens queryClient={queryClient} />);

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Network Error',
        'An error occurred while fetching a random GIF.',
        expect.any(Array),
      ),
    );
  });

  it.todo('refetches data when retry button is pressed in alert');
});

describe('navigation', () => {
  it('navigates to search screen when search bar is pressed', async () => {
    render(<AllScreens />);

    const title = await screen.findByText(GIPHY_GIF_TITLE);
    expect(title).toBeOnTheScreen();

    const searchBarAsButton = screen.getByText('Search');
    fireEvent(searchBarAsButton, 'press');

    const searchBarAsInput = await screen.findByPlaceholderText('Search');
    expect(searchBarAsInput).toBeOnTheScreen();
  });
});
