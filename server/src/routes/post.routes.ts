import { FastifyInstance } from 'fastify';
import postController from '../controllers/post.controller';

const routes = async (server: FastifyInstance, _: any) => {
  server.get('/api/v1/posts', postController.getAllPosts);
  server.post('/api/v1/post', postController.createPost);
};

export default routes;
