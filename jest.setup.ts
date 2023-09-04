import '@testing-library/jest-native/extend-expect';
import 'cross-fetch/polyfill';
import 'react-native-url-polyfill/auto';
import '@shopify/flash-list/jestSetup';
import { cleanup } from '@testing-library/react-native';

import { mswJest } from './mocks/api/server.jest';

const { env } = process;

import { GIPHY_API_URL, GIPHY_API_KEY } from './mocks/api/constants';

beforeAll(() => mswJest.listen());

beforeEach(() => {
  jest.useFakeTimers();

  process.env = {
    ...env,
    EXPO_PUBLIC_GIPHY_API_URL: GIPHY_API_URL,
    EXPO_PUBLIC_GIPHY_API_KEY: GIPHY_API_KEY,
  };
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();

  cleanup();

  mswJest.resetHandlers();
});

afterAll(() => mswJest.close());
