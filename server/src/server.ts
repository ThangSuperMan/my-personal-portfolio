import Fastify, { FastifyInstance } from 'fastify';
import healthcheckRoutes from './modules/healthcheck/healthcheck.routes';
import postRoutes from './modules/post/post.routes';
import cors from '@fastify/cors';
import { getDataSource } from './services/db';
import postRepository from './modules/post/post.repository';
import { Post } from './database/entity/Post';

const initData = async () => {
  const dataSource = await getDataSource();
  const post1 = new Post(
    'Post 1',
    'Something cool about post 1',
    'This is the content of the post.',
    'post1-slug',
    'https://www.joshmedeski.com/_astro/using-bun-with-astro.ptmyVszp_ZE8GSo.webp'
  );

  const post2 = new Post(
    'Post 2',
    'Something cool about post 2',
    'This is the content of the post.',
    'post2-slug',
    'https://www.joshmedeski.com/_astro/using-bun-with-astro.ptmyVszp_ZE8GSo.webp'
  );

  postRepository.createPost(dataSource, post1);
  postRepository.createPost(dataSource, post2);
};

export default function buildServer(): FastifyInstance {
  const server = Fastify();
  server.register(cors);

  initData();

  server.register(healthcheckRoutes);
  server.register(postRoutes);

  return server;
}
