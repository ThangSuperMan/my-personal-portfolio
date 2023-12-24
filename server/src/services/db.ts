import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();
export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_NEW_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  synchronize: true,
  logger: undefined,
  migrationsTableName: 'migrations',
  entities: [User],
  migrations: [],
});

const initDatabase = () => {
  dataSource
    .initialize()
    .then(() => {
      logger.info('data Source has been initialized!');
    })
    .catch((err: any) => logger.error(err));
};

export const getDataSource = async (delay = 3000): Promise<DataSource> => {
  initDatabase();

  if (dataSource.isInitialized) return Promise.resolve(dataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dataSource.isInitialized) {
        resolve(dataSource);
        return;
      }

      reject('Failed to create connection with database');
    }, delay);
  });
};
