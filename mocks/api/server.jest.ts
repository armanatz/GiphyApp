import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const mswJest = setupServer(...handlers);
