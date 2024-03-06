import type { Metadata } from 'next'

import type { Blog, Contest, Faq } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: {
  doc: Contest | Blog | Faq
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  return {
    title: doc?.meta?.title || 'Payload',
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || 'Payload',
      description: doc?.meta?.description || '',
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
