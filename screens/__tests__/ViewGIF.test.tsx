import React from 'react';
import {
  fireEvent,
  render,
  screen,
  act,
  userEvent,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from '../../AppNavigator';

import {
  GIPHY_GIF_TITLE,
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

describe('meta data', () => {
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

  it('renders gif title, short url, and rating passed via navigation params', async () => {
    render(<AllScreens />);

    const searchBarAsButton = screen.getByText('Search');
    fireEvent.press(searchBarAsButton);

    const searchBarAsInput = await screen.findByPlaceholderText('Search');

    await act(async () => {
      const user = userEvent.setup();
      await user.type(searchBarAsInput, 'test', {
        skipPress: true,
        submitEditing: false,
      });
    });

    const searchResultsImages =
      await screen.findAllByA11yHint('View GIF details');
    fireEvent.press(searchResultsImages[0]);

    const title = await screen.findByText(GIPHY_GIF_TITLE);
    expect(title).toBeOnTheScreen();

    const shortUrl = screen.getByText(GIPHY_GIF_SHORT_URL);
    const rating = screen.getByText(GIPHY_GIF_RATING.toLocaleUpperCase());

    expect(shortUrl).toBeOnTheScreen();
    expect(rating).toBeOnTheScreen();
  });
});

describe('navigation', () => {
  it('navigates to search screen when pressing back button in header', async () => {
    render(<AllScreens />);

    const searchBarAsButton = screen.getByText('Search');
    fireEvent.press(searchBarAsButton);

    const searchBarAsInput = await screen.findByPlaceholderText('Search');

    await act(async () => {
      const user = userEvent.setup();
      await user.type(searchBarAsInput, 'test', {
        skipPress: true,
        submitEditing: false,
      });
    });

    const searchResultsImages =
      await screen.findAllByA11yHint('View GIF details');
    fireEvent.press(searchResultsImages[0]);

    const HeaderBackBtn = await screen.findByA11yHint('Go back to search');
    fireEvent.press(HeaderBackBtn);

    const searchResultsText = await screen.findByText('Search results:');
    expect(searchResultsText).toBeOnTheScreen();
  });
});
