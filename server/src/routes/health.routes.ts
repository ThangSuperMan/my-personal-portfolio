import { FastifyInstance } from 'fastify';
import healthController from '../controllers/health.controller';

const routes = async (server: FastifyInstance, _: any) => {
  server.get('/health', healthController.checkHealth);
};

export default routes;
