import buildServer from '../../../server';
import { test } from 'tap';
import { Post } from '../../../database/entity/Post';
import { formatReply } from '../../../utils';

test('POST `/api/v1/post` - create post successfully with mock createUser', async (t) => {
  const server = buildServer();
  const post: Post = new Post(
    'My first post',
    'This is a cool post',
    'Content of post',
    'my-slug',
    'https://image.jpg'
  );

  t.teardown(() => {
    server.close();
  });

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

// test('POST `/api/v1/post` - fail to create a post', async (t) => {
//   const server = buildServer();

//   const response = await server.inject({
//     method: 'POST',
//     url: '/api/v1/post',
//     payload: {
//       shortDescription: 'This is a cool post',
//       content: 'Content of post',
//       slug: 'my-slug',
//       thumbnailImageUrl: 'https://image.jpg'
//     }
//   });

//   t.teardown(() => {
//     server.close();
//   });

//   console.log('response :>> ', response.json());
//   const json = response.json();
//   t.equal(response.statusCode, 500);
//   t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
//   t.match(
//     json,
//     formatReply(
//       500,
//       'null value in column "title" of relation "posts" violates not-null constraint'
//     )
//   );
// });
