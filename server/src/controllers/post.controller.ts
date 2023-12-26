import { FastifyReply, FastifyRequest } from 'fastify';
import { formatErrorResponse } from '../utils';
import { getDataSource } from '../services/db';
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
  try {
    const dataSource = await getDataSource();
    const posts = await postRepository.getPosts(dataSource);
    console.log('posts :>> ', posts);
    rep.send({ posts });
  } catch (err: any) {
    rep.status(500).send(formatErrorResponse(500, err));
  }
};

export const createPost = async (
  req: FastifyRequest<CreatePostRequest>,
  rep: FastifyReply
) => {
  req.body;
  const { title, shortDescription, content, slug, thumbnailImageUrl } =
    req.body;
  req.body.content;
  console.log('req.body :>> ', req.body);
  const post = new Post(
    title,
    shortDescription,
    content,
    slug,
    thumbnailImageUrl
  );

  rep.send({ post });
};

export default {
  getAllPosts,
  createPost,
};
