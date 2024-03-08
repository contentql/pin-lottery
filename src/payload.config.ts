import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import seo from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
import Blog from './collections/Blog'
import Contact from './collections/Contact'
import Contest from './collections/Contest'
import Faq from './collections/Faq'
import { Media } from './collections/Media'
import Tags from './collections/Tags'
import Users from './collections/Users'
import Logo from './components/payload-icons/Logo'
import Icon from './components/payload-icons/Icon'
import { s3StorageAdapter } from './plugins/s3'
import {
  generateDescription,
  generateImage,
  generateTitle,
  generateURL,
} from './utils/seo'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  collections: [Users, Media, Contest, Contact, Blog, Faq, Tags],
  routes: {
    admin: '/admin',
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    // css: path.resolve(__dirname, '/src/styles/new.scss'),
    webpack: (config: any) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        util: false,
        os: false,
      }
      return config
    },
    meta: {
      titleSuffix: '- ContentQL',
      favicon: 'favicon.ico',
      ogImage: 'images/client/2.png',
    },
    components: {
      graphics: {
        Logo: Logo,
        Icon: Icon,
      },
    },
  },
  rateLimit: {
    max: 2000, // only for development
  },
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: s3StorageAdapter,
        },
      },
    }),
    seo({
      collections: ['blog', 'contest'],
      uploadsCollection: 'media',
      generateTitle,
      generateDescription,
      generateImage,
      generateURL,
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
})
