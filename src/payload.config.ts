import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { sentry } from '@payloadcms/plugin-sentry'
import seo from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
import Blog from './collections/Blog'
import Cart from './collections/Cart'
import Contact from './collections/Contact'
import Contest from './collections/Contest'
import Faq from './collections/Faq'
import { Media } from './collections/Media'
import Tags from './collections/Tags'
import Ticket from './collections/Ticket'
import Users from './collections/Users'
import Winner from './collections/Winner'
import Wishlist from './collections/Wishlist'
import Icon from './components/payload-icons/Icon'
import Logo from './components/payload-icons/Logo'
import BeforeDashboard from './payload-components/BeforeDashboard'
import { roleBasedCollectionVisibility } from './plugins/payload-hidden'
import { paystack } from './plugins/payload-paystack'
import { trashBin } from './plugins/payload-trashbin'
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
  defaultDepth: 10,
  collections: [
    Users,
    Media,
    Contest,
    Cart,
    Ticket,
    Winner,
    Contact,
    Blog,
    Faq,
    Tags,
    Wishlist,
  ],
  routes: {
    admin: '/admin',
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    // css: path.resolve(__dirname, '/src/styles/new.scss'),
    css: path.resolve(__dirname, 'themes/cql/index.scss'),
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
      beforeDashboard: [BeforeDashboard],
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
    sentry({
      dsn: process.env.SENTRY_DNS!,
      options: {
        init: {
          debug: true,
          environment: process.env.SENTRY_ENV,
          tracesSampleRate: 1.0,
        },
        requestHandler: {
          serverName: false,
          user: ['email'],
          include: {
            user: true,
          },
        },
        // captureErrors: [400, 403, 404],
      },
    }),
    seo({
      collections: ['blog', 'contest'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle,
      generateDescription,
      generateImage,
      generateURL,
    }),
    paystack,
    /* 
    Both for trashbin and roleBasedCollectionVisibility

    This will override existing hidden settings if they exist
    Assuming the user collection has a 'roles' field with multiple select options and it is saved to JWT
    */
    roleBasedCollectionVisibility({
      hideCollectionsForRole: {
        // admin: [],
        manager: ['contact', 'users', 'blog', 'faq'],
        editor: ['contact', 'users', 'contest', 'tags', 'tickets', 'winner'],
      },
      hideAllCollectionsForRole: ['user'],
      hideCollectionsForAllRoles: ['cart', 'wishlist'],
    }),
    trashBin({
      // displayToRoles: ['all'] // default value
      displayToRoles: ['admin'], // visible only to admins
      doNotEnableTrash: ['cart', 'wishlist', 'media'],
    }),
    // Retrieve URL from environment variables or configuration settings.
    // mediaCloudflareURLHandler({
    //   pubR2URL:
    //     'https://pub-4569e4e5d557441e896fc4fbf32626f3.r2.dev/cql-storage-r2',
    // }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
})
