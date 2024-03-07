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
    doc.meta.image.url

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc?.title}/${doc?.id}`

  return {
    title: doc?.meta?.title || 'Lottery',
    description: doc?.meta?.description || 'Lottery - Description',
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || 'Lottery',
      description: doc?.meta?.description || 'Lottery - Description',
      url,
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
