import { test } from 'tap';
import buildServer from '../../../server';

test('GET `healthcheck` - status should be ok', async (t) => {
  const server = buildServer();

  t.teardown(() => {
    server.close();
  });

  const response = await server.inject({
    method: 'GET',
    url: '/healthcheck'
  });

  t.equal(response.statusCode, 200);
  t.same(response.json(), { status: 'ok' });
});
