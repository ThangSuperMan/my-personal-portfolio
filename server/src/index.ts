import Fastify, { FastifyInstance } from 'fastify';
import { logger, formatErrorResponse } from './utils';
import { getDataSource } from './services/db';
import healthRoutes from './routes/health.routes';
import postRoutes from './routes/post.routes';
import * as dotenv from 'dotenv';
import { Post } from './database/entity/Post';
dotenv.config();

let port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  port = 4000;
}

const server: FastifyInstance = Fastify();

server.register(healthRoutes);
server.register(postRoutes);

server.get('/hello', async (req: any, rep: any) => {
  rep.send('abother hello');
});

server.get('/', async (req: any, rep: any) => {
  try {
    const dataSource = await getDataSource();
    dataSource.getRepository(Post);
  } catch (err: any) {
    logger.error(err);
    rep.status(500).send(formatErrorResponse(500, err));
  }
  rep.send('Hello');
});

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
