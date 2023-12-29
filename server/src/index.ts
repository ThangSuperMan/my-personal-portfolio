import { FastifyInstance } from 'fastify';
import buildServer from './server';
import { logger } from './utils';
import * as dotenv from 'dotenv';
dotenv.config();

let port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  port = 4000;
}

const server: FastifyInstance = buildServer();

const main = async () => {
  try {
    await server.listen({ port });
    logger.info(`🚀 server is listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

main();
