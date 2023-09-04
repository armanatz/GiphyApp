import 'cross-fetch/polyfill';
import 'react-native-url-polyfill/auto';
import { setupServer } from 'msw/native';
import { handlers } from './handlers';

export const mswDev = setupServer(...handlers);
