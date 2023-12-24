import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getHealthSchema } from './schema';

export default function healthHandler(
  fastify: FastifyInstance,
  _: any,
  next: any
) {
  fastify.get(
    '/health',
    { schema: getHealthSchema },
    (req: FastifyRequest, rep: FastifyReply) => {
      rep.status(500);
      rep.send({ status: 'ok' });
    }
  );

  next();
}
