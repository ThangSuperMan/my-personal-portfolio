import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Post } from '../../database/entity/Post';

export const getPosts = async (dataSource: DataSource): Promise<Post[]> => {
  const postRepository = dataSource.getRepository(Post);
  const posts: Promise<Post[]> = postRepository.find();

  return posts;
};

export const getPostById = async (dataSource: DataSource, id: number): Promise<Post> => {
  const postRepository = dataSource.getRepository(Post);
  const post: Promise<Post> = postRepository.findOne({ where: { id } });

  return post;
};

export const createPost = async (dataSource: DataSource, post: Post): Promise<Post> => {
  const postRepository: Repository<Post> = dataSource.getRepository(Post);

  return postRepository.save(post);
};

export const updatePostById = async (dataSource: DataSource, id: number, post: Post) => {
  const postRepository: Repository<Post> = dataSource.getRepository(Post);
  postRepository.update({ id }, { ...post });
};

export const deletePostById = async (dataSource: DataSource, id: number): Promise<DeleteResult> => {
  const postRepository: Repository<Post> = dataSource.getRepository(Post);
  const deleteResult = await postRepository.delete({ id });
  return deleteResult;
};

export default {
  getPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById
};
