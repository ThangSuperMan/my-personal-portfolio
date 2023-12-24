import createServer from './server';

const PORT = process.env.PORT || 7000;
const server = createServer();

server.listen(+PORT, '0.0.0.0', (err: any, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log(`server is listening on ${address} with port ${PORT}`);
});
