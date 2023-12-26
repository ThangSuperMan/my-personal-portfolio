import { FastifyReply, FastifyRequest } from 'fastify';
import { formatReply, tryCatchWrapper } from '../utils';
import { dataSource, getDataSource } from '../services/db';
import postRepository from '../repositories/post.repository';
import { Post } from '../database/entity/Post';

interface CreatePostRequest {
  Body: {
    title: string;
    shortDescription: string;
    content?: string;
    slug: string;
    thumbnailImageUrl?: string;
  };
}

export const getAllPosts = async (req: FastifyRequest, rep: FastifyReply) => {
  await tryCatchWrapper(async () => {
    const dataSource = await getDataSource();
    const posts: Post[] = await postRepository.getPosts(dataSource);

    rep.send(formatReply(200, 'Posts fetched successfully', posts));
  }, rep);
};

export const createPost = async (
  req: FastifyRequest<CreatePostRequest>,
  rep: FastifyReply
) => {
  req.body;
  const { title, shortDescription, content, slug, thumbnailImageUrl } =
    req.body;
  req.body.content;
  tryCatchWrapper(async () => {
    const post = new Post(
      title,
      shortDescription,
      content,
      slug,
      thumbnailImageUrl
    );
    postRepository.createPost(dataSource, post);

    rep.send(formatReply(200, 'Posts fetched successfully'));
  }, rep);
};

export default {
  getAllPosts,
  createPost,
};
