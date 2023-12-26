import { FastifyReply, FastifyRequest } from 'fastify';

export const checkHealth = (req: FastifyRequest, rep: FastifyReply) => {
  rep.send({ status: 'ok' });
};

export default {
  checkHealth,
};
