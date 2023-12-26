import { DataSource, Repository } from 'typeorm';
import { Post } from '../database/entity/Post';
import { logger } from '../utils';

export const getPosts = async (dataSource: DataSource): Promise<Post[]> => {
  const postRepository = dataSource.getRepository(Post);
  const posts = postRepository.find();

  return posts;
};

export const createPost = async (
  dataSource: DataSource,
  post: Post
): Promise<Post> => {
  let postRepository: Repository<Post>;

  try {
    postRepository = dataSource.getRepository(Post);
  } catch (err: any) {
    logger.error(err);
  }

  return postRepository.save(post);
};

export default {
  getPosts,
  createPost,
};
