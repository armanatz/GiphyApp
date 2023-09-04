import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  userEvent,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { Alert } from 'react-native';

import AppNavigator from '../../AppNavigator';

import { mswJest } from '../../mocks/api/server.jest';

import { GIPHY_GIF_TITLE } from '../../mocks/api/constants';

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
  it('renders with search bar as TextInput', async () => {
    render(<AllScreens />);

    let searchBarAsButton = screen.getByText('Search');
    fireEvent.press(searchBarAsButton);

    const searchBarAsInput = await screen.findByPlaceholderText('Search');
    expect(searchBarAsInput).toBeOnTheScreen();

    searchBarAsButton = screen.queryByText('Search');
    expect(searchBarAsButton).not.toBeOnTheScreen();
  });

  it('does not render with results on initial load', async () => {
    render(<AllScreens />);

    const searchBarAsButton = screen.getByText('Search');
    fireEvent.press(searchBarAsButton);

    const searchResultsList = screen.queryAllByA11yHint('View GIF details');
    expect(searchResultsList).toHaveLength(0);
  });

  it('renders with results after searching', async () => {
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
    expect(searchResultsImages.length).not.toBe(0);
  });
});

describe('navigation', () => {
  it('goes back to home screen on cancel press', async () => {
    render(<AllScreens />);

    const searchBarAsButton = screen.getByText('Search');
    fireEvent.press(searchBarAsButton);

    const cancelButton = await screen.findByText('Cancel');
    fireEvent.press(cancelButton);

    const randomGIFText = await screen.findByText('Random selected GIF:');
    expect(randomGIFText).toBeOnTheScreen();
  });

  it('goes to view gif screen when pressing image from results', async () => {
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

    const gifTitle = await screen.findByText(GIPHY_GIF_TITLE);
    expect(gifTitle).toBeOnTheScreen();
  });
});

describe('behaviors', () => {
  it.skip('removes results if clear button is pressed', async () => {
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

    let searchResultsImages =
      await screen.findAllByA11yHint('View GIF details');
    expect(searchResultsImages.length).not.toBe(0);

    const clearButton = await screen.findByA11yHint('Clear search');
    expect(clearButton).toBeOnTheScreen();

    fireEvent.press(clearButton);

    expect(searchBarAsInput.props.value).toBe('');

    expect(searchResultsImages.length).toBe(0);
  });
});
