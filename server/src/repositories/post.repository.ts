import { DataSource } from 'typeorm';
import { Post } from '../database/entity/Post';

export const getPosts = async (dataSource: DataSource): Promise<Post[]> => {
  const postRepository = dataSource.getRepository(Post);
  const posts = postRepository.find();

  return posts;
};

export const createPost = async (
  dataSource: DataSource,
  post: Post
): Promise<Post> => {
  const postRepository = dataSource.getRepository(Post);
  return postRepository.save(post);
};

export default {
  getPosts,
};
