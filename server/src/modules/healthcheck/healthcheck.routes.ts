import { FastifyInstance } from 'fastify';
import healthController from './healthcheck.controller';

const routes = async (server: FastifyInstance, _: any) => {
  server.get('/healthcheck', healthController.checkHealth);
};

export default routes;
