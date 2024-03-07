import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Lottery',
  title: 'Lottery',
  description: 'An lottery site built with Payload and Next.js.',
  images: [
    {
      url: 'https://pin-lottery-production.up.railway.app/images/client/3.png',
    },
  ],
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
