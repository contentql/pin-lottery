import { appRouter } from '@/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: '/api/trpc', // TODO: NOTE 6
    req,
    router: appRouter,

    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
