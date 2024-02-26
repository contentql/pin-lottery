import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import Users from './collections/Users';
import dotenv from 'dotenv';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3StorageAdapter } from './plugins/s3';
import { Media } from './collections/Media';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  collections: [Users, Media],
  routes: {
    admin: '/admin',
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config: any) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        util: false,
        os: false,
      };
      return config;
    },
    meta: {
      titleSuffix: '- ContentQL',
    },
  },
  rateLimit: {
    max: 2000, // only for development
  },
  editor: slateEditor({}),
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
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
});
