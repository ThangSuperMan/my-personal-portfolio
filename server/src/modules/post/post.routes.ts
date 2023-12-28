import { FastifyInstance } from 'fastify';
import postController from './post.controller';

const routes = async (server: FastifyInstance, _: any) => {
  server.get('/api/v1/posts', postController.getAllPosts);
  server.get('/api/v1/posts/:id', postController.getPostDetail);
  server.post('/api/v1/post', postController.createPost);
  server.post('/api/v1/post/:id', postController.updatePost);
  server.delete('/api/v1/post/:id', postController.deletePost);
};

export default routes;
