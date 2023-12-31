import { FastifyReply, FastifyRequest } from 'fastify';
import { formatReply, tryCatchWrapper } from '../../utils';
import { dataSource, getDataSource } from '../../services/db';
import postRepository from './post.repository';
import { Post } from '../../database/entity/Post';
import { BodyPostArticleRequest } from '../../types';
import { HttpStatus } from '../../constants';
import { ParamsPostArticleRequest } from '../../types/ParamsPostArticleRequest';

export const getAllPosts = async (req: FastifyRequest, rep: FastifyReply) => {
  await tryCatchWrapper(async () => {
    const dataSource = await getDataSource();
    const posts: Post[] = await postRepository.getPosts(dataSource);
    if (posts) {
      rep.send(formatReply(HttpStatus.Success, 'Posts fetched successfully', { posts }));
    }

    rep.status(HttpStatus.NotFound).send(formatReply(HttpStatus.NotFound, 'Posts not found'));
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
      rep.send(formatReply(HttpStatus.Success, 'Post fetched successfully', { post }));
    }

    rep.status(HttpStatus.NotFound).send(formatReply(HttpStatus.NotFound, 'Post not found'));
  }, rep);
};

export const createPost = async (
  req: FastifyRequest<BodyPostArticleRequest>,
  rep: FastifyReply
) => {
  const { title, shortDescription, content, slug, thumbnailImageUrl } = req.body;

  await tryCatchWrapper(async () => {
    const postArticle = new Post(title, shortDescription, content, slug, thumbnailImageUrl);
    const dataSource = await getDataSource();

    const post: Post = await postRepository.createPost(dataSource, postArticle);
    if (post) {
      rep
        .status(HttpStatus.Created)
        .send(formatReply(HttpStatus.Created, 'Post created successfully', { post }));
    }
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

    rep.send(formatReply(HttpStatus.Success, 'Post updated successfully'));
  }, rep);
};

export const deletePost = async (
  req: FastifyRequest<ParamsPostArticleRequest>,
  rep: FastifyReply
) => {
  const postId: number = req.params.id;
  await tryCatchWrapper(async () => {
    const dataSource = await getDataSource();
    const deleteResult = await postRepository.deletePostById(dataSource, postId);

    const isPostDeleted = deleteResult.affected === 1;
    if (!isPostDeleted) {
      rep.send(formatReply(HttpStatus.NotFound, 'Post not found'));
    }

    rep.send(formatReply(HttpStatus.Success, 'Post deleted successfully'));
  }, rep);
};

export default {
  getAllPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost
};
