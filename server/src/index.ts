import createServer from './server';
import logger from './utils/logger';

const PORT = process.env.PORT || 7000;
const server = createServer();

server.listen(+PORT, '0.0.0.0', (err: any, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }

  logger.info(`server is listening on ${address} with port ${PORT}`);
});
