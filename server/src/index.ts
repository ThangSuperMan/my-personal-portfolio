import Fastify, { FastifyInstance } from 'fastify';
import healthRoutes from './routes/health.routes';
import postRoutes from './routes/post.routes';
import { logger } from './utils';
import * as dotenv from 'dotenv';
dotenv.config();

let port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  port = 4000;
}

const server: FastifyInstance = Fastify();

server.register(healthRoutes);
server.register(postRoutes);

const start = async () => {
  try {
    await server.listen({ port });
    logger.info(`🚀 server is listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
