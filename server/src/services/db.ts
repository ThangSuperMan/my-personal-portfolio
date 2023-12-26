import { DataSource } from 'typeorm';
import { logger } from '../utils';
import { Post } from '../database/entity/Post';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const isCompiled: boolean = path.extname(__filename).includes('js');

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_DB_PORT,
  username: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_NEW_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  synchronize: !process.env.POSTGRES_DB_NO_SYNC,
  logger: 'advanced-console',
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [Post],
  migrations: [`src/database/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
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
