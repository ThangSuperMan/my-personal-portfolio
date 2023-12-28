import { FastifyReply, FastifyRequest } from 'fastify';

export const checkHealth = (_: FastifyRequest, rep: FastifyReply) => {
  rep.send({ status: 'ok' });
};

export default {
  checkHealth
};
