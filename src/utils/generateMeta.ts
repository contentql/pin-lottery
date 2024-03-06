import type { Metadata } from 'next'

import type { Blog, Contest } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: {
  doc: Contest | Blog
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  return {
    title: doc?.meta?.title || 'Lottery',
    description: doc?.meta?.description || 'Lottery - Description',
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || 'Lottery',
      description: doc?.meta?.description || 'Lottery - Description',
      url: Array.isArray(doc?.meta?.title) ? doc?.meta?.title.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
