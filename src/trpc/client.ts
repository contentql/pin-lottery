import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './';

// TODO: Note 1
export const trpc = createTRPCReact<AppRouter>({});
