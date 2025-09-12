import type { Context } from '@netlify/functions';
import { type Connect, loadEnv, type Plugin } from 'vite';
import { resolve } from 'node:path';

interface NetlifyFunctionDefinition {
  route: `/.netlify/${string}`;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  fn: HandlerFn;
}

type HandlerFn = (request: Request, context: Context) => Promise<Response>;

const fakeNetlifyFn =
  (method: NetlifyFunctionDefinition['method'], handlerFn: HandlerFn): Connect.NextHandleFunction =>
  async (req, res, next) => {
    if (req.method !== method) next();

    const handlerContext = {
      clientContext: {
        custom: {
          netlify: Buffer.from(
            JSON.stringify({
              site_url: process.env.DEPLOY_PRIME_URL,
            }),
          ),
        },
      },
    } as unknown as Context;

    try {
      const response = await handlerFn(req as unknown as Request, handlerContext);
      const body = await response.text();

      res.statusCode = response.status;
      res.end(body);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end();
    }
  };

export const fakeNetlifyPlugin = (functionDefs: NetlifyFunctionDefinition[]): Plugin => ({
  name: 'fakeNetlifyPlugin',
  configEnvironment() {
    process.env = loadEnv('development', resolve(import.meta.dirname), '');
  },
  configureServer(server) {
    for (const { route, method, fn } of functionDefs) {
      server.middlewares.use(route, fakeNetlifyFn(method, fn));
    }
  },
  configurePreviewServer(server) {
    for (const { route, method, fn } of functionDefs) {
      server.middlewares.use(route, fakeNetlifyFn(method, fn));
    }
  },
});
