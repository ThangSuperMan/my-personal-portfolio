import { FastifyReply, FastifyRequest } from 'fastify';
import { formatReply, tryCatchWrapper } from '../utils';
import { dataSource, getDataSource } from '../services/db';
import postRepository from '../repositories/post.repository';
import { Post } from '../database/entity/Post';
import { BodyPostArticleRequest } from '../types';
import { StatusCode } from '../constants';
import { ParamsPostArticleRequest } from '../types/ParamsPostArticleRequest';

export const getAllPosts = async (_: FastifyRequest, rep: FastifyReply) => {
  await tryCatchWrapper(async () => {
    const dataSource = await getDataSource();
    const posts: Post[] = await postRepository.getPosts(dataSource);

    if (posts) {
      rep.send(formatReply(StatusCode.Success, 'Posts fetched successfully', { posts }));
    }

    rep
      .status(StatusCode.NotFound)
      .send(formatReply(StatusCode.NotFound, 'Posts not found', { posts }));
  }, rep);
};

export const getPostDetail = async (
  req: FastifyRequest<ParamsPostArticleRequest>,
  rep: FastifyReply
) => {
  await tryCatchWrapper(async () => {
    const postId: number = req.params.id;
    const dataSource = await getDataSource();
    const post: Post = await postRepository.getPostById(dataSource, postId);
    if (post) {
      rep.send(formatReply(StatusCode.Success, 'Post fetched successfully', { post }));
    }

    rep.status(StatusCode.NotFound).send(formatReply(StatusCode.NotFound, 'Post not found'));
  }, rep);
};

export const createPost = async (
  req: FastifyRequest<BodyPostArticleRequest>,
  rep: FastifyReply
) => {
  const { title, shortDescription, content, slug, thumbnailImageUrl } = req.body;
  await tryCatchWrapper(async () => {
    const post = new Post(title, shortDescription, content, slug, thumbnailImageUrl);
    await postRepository.createPost(dataSource, post);

    rep.send(formatReply(StatusCode.Success, 'Post created successfully'));
  }, rep);
};

export const updatePost = async (
  req: FastifyRequest<BodyPostArticleRequest & ParamsPostArticleRequest>,
  rep: FastifyReply
) => {
  const { title, shortDescription, content, slug, thumbnailImageUrl } = req.body;
  const postId = req.params.id;
  await tryCatchWrapper(async () => {
    const post = new Post(title, shortDescription, content, slug, thumbnailImageUrl);
    await postRepository.updatePostById(dataSource, postId, post);

    rep.send(formatReply(StatusCode.Success, 'Post updated successfully'));
  }, rep);
};

export const deletePost = async (
  req: FastifyRequest<ParamsPostArticleRequest>,
  rep: FastifyReply
) => {
  const postId: number = req.params.id;
  await tryCatchWrapper(async () => {
    const dataSource = await getDataSource();
    await postRepository.deletePostById(dataSource, postId);

    rep.send(formatReply(StatusCode.Success, 'Post deleted successfully'));
  }, rep);
};

export default {
  getAllPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost
};
