import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

// dotenv.config({
//   path: path.resolve(__dirname, '../.env'),
// });

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [],
  routes: {
    admin: '/admin',
  },
  admin: {
    bundler: webpackBundler(),
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
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
