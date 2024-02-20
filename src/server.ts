import express from 'express';
import { getPayloadClient } from './get-payload';

const PORT = Number(process.env.PORT) || 3000;

const app = express();

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });
};

start();
