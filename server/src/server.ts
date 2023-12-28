import Fastify, { FastifyInstance } from 'fastify';
import healthcheckRoutes from './modules/healthcheck/healthcheck.routes';
import postRoutes from './modules/post/post.routes';

export default function buildServer(): FastifyInstance {
  const server = Fastify();
  server.register(healthcheckRoutes);
  server.register(postRoutes);

  return server;
}
