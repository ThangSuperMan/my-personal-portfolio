import { FastifyReply } from 'fastify';
import { logger, formatResponse } from '../utils';

export const tryCatchWrapper = async (
  callback: () => Promise<void>,
  rep: FastifyReply
) => {
  try {
    await callback();
  } catch (err: any) {
    logger.error(err);
    rep.status(500).send(formatResponse(500, err));
  }
};
