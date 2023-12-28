import { FastifyReply } from 'fastify';
import { formatReply, logger } from '../utils';
import { HttpStatus } from '../constants';

export const tryCatchWrapper = async (callback: () => Promise<void>, rep: FastifyReply) => {
  try {
    await callback();
  } catch (err: any) {
    logger.error(err);
    rep
      .status(HttpStatus.ErrorExternalServer)
      .send(formatReply(HttpStatus.ErrorExternalServer, err));
  }
};
