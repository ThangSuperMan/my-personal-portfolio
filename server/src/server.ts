import { fastify } from 'fastify';
import healthHandler from './modules/health/routes';
import { getDataSource } from './services/db';
import dotenv from 'dotenv';
import { User } from './entities/user.entity';
import logger from './utils/logger';

dotenv.config();

const init = async () => {
  try {
    const appDateSource = await getDataSource();
    const userRepository = appDateSource.getRepository(User);

    const user = new User();
    user.name = 'Ngoc';
    user.description = 'Graphic Designer';
    user.avatar_url = 'https://i.pravatar.cc/300?img=3';

    userRepository.save(user);
  } catch (err: any) {
    logger.error(err);
  }
};

init();

export default function createServer() {
  const server = fastify();
  server.register(healthHandler);

  return server;
}
