import { DataSource } from 'typeorm';
import { logger } from '../utils';
import { Post } from '../database/entity/Post';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
dotenv.config();

const isTestENV = process.env.NODE_ENV === 'test';

const getDatabaseNameBasedOnENV = (): string => {
  if (isTestENV) {
    return process.env.POSTGRES_DB_TEST_NAME;
  }

  return process.env.POSTGRES_DB_PRODUCTION_NAME;
};

const getDatabaseUsernameBasedOnENV = (): string => {
  if (isTestENV) {
    return process.env.POSTGRES_BB_TEST_USERNAME;
  }

  return process.env.POSTGRES_DB_PRODUCTION_USERNAME;
};

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: +process.env.POSTGRES_DB_PORT,
  username: getDatabaseUsernameBasedOnENV(),
  password: process.env.POSTGRES_NEW_DB_PASSWORD,
  database: getDatabaseNameBasedOnENV(),
  synchronize: !process.env.POSTGRES_DB_NO_SYNC,
  logger: 'advanced-console',
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [Post],
  migrations: ['src/database/migration/*.ts']
});

const initializeDatabase = () => {
  dataSource
    .initialize()
    .then(() => {
      logger.info('🌴 Database connection was successful!');
    })
    .catch((err: any) => logger.error(err));
};

export const getDataSource = async (delay = 2000): Promise<DataSource> => {
  if (dataSource.isInitialized) return Promise.resolve(dataSource);

  return new Promise((resolve, reject) => {
    initializeDatabase();
    setTimeout(() => {
      if (dataSource.isInitialized) {
        resolve(dataSource);
        return;
      }

      reject('Failed to create connection with database');
    }, delay);
  });
};
