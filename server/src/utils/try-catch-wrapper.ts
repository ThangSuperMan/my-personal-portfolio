import { FastifyReply } from 'fastify';
import { formatReply, logger } from '../utils';
import { StatusCode } from '../constants';

export const tryCatchWrapper = async (
  callback: () => Promise<void>,
  rep: FastifyReply
) => {
  try {
    await callback();
  } catch (err: any) {
    logger.error(err);
    rep
      .status(StatusCode.ErrorExternalSerer)
      .send(formatReply(StatusCode.ErrorExternalSerer, err));
  }
};
