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

    // This will override existing hidden settings if they exist
    // Assuming the user collection has a 'roles' field with multiple select options and it is saved to JWT
    // roleBasedCollectionVisibility({
    //   // List of roles to include in the hidden configuration, ordered by priority from high to low
    //   // If a role is not mentioned here, by default, all collections will be hidden for that role (only if the user has a single role)
    //   // If a role is mentioned here but not specified in the hidden object, the specific role will have access to all collections
    //   // roles: ['admin', 'manager', 'editor'],

    //   // Hidden options for each role
    //   // Collection names should match with the slug in the specific collection
    //   hideCollectionsForRole: {
    //     admin: [],
    //     manager: ['cart', 'wishlist', 'contact', 'users', 'blog', 'faq'],
    //     editor: [
    //       'cart',
    //       'wishlist',
    //       'contact',
    //       'users',
    //       'contest',
    //       'tags',
    //       'tickets',
    //       'winner',
    //       'media',
    //     ],
    //   },
    // }),

    trashBin({
      // displayToRoles: ['all'] // default value
      displayToRoles: ['admin'], // visible only to admins
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
})
