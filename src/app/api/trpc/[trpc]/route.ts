import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/trpc'

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // context already passed from express middleware
    // @ts-expect-error
    createContext: () => ({}),
  })
}

export { handler as GET, handler as POST }
