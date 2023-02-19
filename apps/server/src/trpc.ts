import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import cors from 'cors';

const RUNNING_PORT = 3001

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {

  return {
    req,
    res,
  };
};
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;


// root router to call
const appRouter = router({
  // or individual procedures
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    console.log('test')
    return {
      name: input ?? 'test',
    }
  }),
});

export type AppRouter = typeof appRouter;

async function main() {
  // express implementation
  const app = express();
  app.use(cors())

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

    next();
  });

  app.use(
    '/',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  app.listen(RUNNING_PORT, () => {
    console.log(`listening on port ${RUNNING_PORT}`);
  });
}

main();