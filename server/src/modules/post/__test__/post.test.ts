import buildServer from '../../../server';
import { test } from 'tap';
import { Post } from '../../../database/entity/Post';
import { formatReply, logger } from '../../../utils';
import { getDataSource } from '../../../services/db';

const POSTS_TOTAL: number = 2;

const post1: Post = new Post(
  'My first post',
  'This is a cool post',
  'Content of post',
  'my-slug',
  'https://image1.jpg'
);

const post2: Post = new Post(
  'My second post',
  'This is a cool post',
  'Content of post',
  'my-slug',
  'https://image1.jpg'
);

const posts: Post[] = [post1, post2];

const isMatchPostArticle = (expectedPost: Post, actualPost: any): boolean => {
  return (
    expectedPost.title === actualPost.title &&
    expectedPost.shortDescription === actualPost.shortDescription &&
    expectedPost.content === actualPost.content &&
    expectedPost.slug === actualPost.slug &&
    expectedPost.thumbnailImageUrl === actualPost.thumbnailImageUrl
  );
};

const setupDatabaseData = async () => {
  const dataSource = await getDataSource();
  const customPostRepository = dataSource.getRepository(Post);
  await customPostRepository.clear();
  await customPostRepository.createQueryBuilder().insert().into(Post).values(posts).execute();
};

test('POST `/api/v1/post` - create post successfully with database', async (t) => {
  t.teardown(async () => {
    server.close();
  });

  const server = buildServer();
  const post = post1;

  const response = await server.inject({
    method: 'POST',
    url: '/api/v1/post',
    payload: post
  });

  const json = response.json();
  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
  t.match(json, formatReply(201, 'Post created successfully', { post }));
});

test('POST `/api/v1/post` - fetch all posts successfully with database', async (t) => {
  const server = buildServer();

  await setupDatabaseData();

  t.teardown(async () => {
    server.close();
  });

  const response = await server.inject({
    method: 'GET',
    url: '/api/v1/posts'
  });
  const json = response.json();
  let isMatch: boolean = true;

  for (let i = 0; i < POSTS_TOTAL; i++) {
    if (!isMatchPostArticle(posts[i], json.data.posts[i])) {
      isMatch = false;
      break;
    }
  }

  t.equal(response.statusCode, 200);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
  t.equal(json.data.posts.length, POSTS_TOTAL);
  t.equal(isMatch, true);
});
