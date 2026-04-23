import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { db } from './db';

const app = new Elysia()
  .use(cors())
  .get('/ping', () => ({ status: 'ok', message: 'pong' }))
  .get('/users', async () => {
    try {
      const allUsers = await db.query.users.findMany();
      return allUsers;
    } catch (error) {
      console.error(error);
      return { error: 'Database connection failed' };
    }
  })
  .listen(3000);

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
