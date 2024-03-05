import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

export const s3StorageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
  },
  bucket: process.env.S3_BUCKET!,
})
