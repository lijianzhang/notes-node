/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 21:54:27
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:47:17
 * @flow
 */

import KoaRouter from 'koa-router';

// 支持的methods
const METHOD_TYPES = ['head', 'options', 'get', 'put', 'patch', 'post', 'delete'];

type Middleware = (ctx: Object, next: Function) => any;

const Blueprint = (prefix: string = '', ...rootMiddleware: Array<Middleware>) => {
  const router = new KoaRouter({ prefix });
  router.use(...rootMiddleware);

  function decorateRoter(path, methods, ...middleware) {
    return (Target: Object, key?: string, descriptor?: Object) => {
      const func = async (ctx, next) => {
        const obj = new Target.constructor();
        obj.ctx = ctx;
        obj.next = next;
        await obj[key](ctx, next);
      };
      middleware.push(func);
      methods.forEach(method => router[method](path, ...middleware));
      return descriptor;
    };
  }
  const methods = {};
  METHOD_TYPES.forEach((method) => {
    methods[method] = (path, ...middleware: Array<Middleware>) =>
      decorateRoter(path, [method], ...middleware);
  });

  return {
    ...methods,
    methods: (path: RegExp | string, methods:Array<string> = ['get'], ...middleware: Array<Middleware>) =>
      decorateRoter(path, methods, ...middleware),
    use: (...arg: Array<Function>) => router.use(...arg),
    routes: ():Function => {
      router.stack.reverse();
      return router.routes();
    },
    redirect: (...arg: Array<any>) => router.redirect(...arg),
    class: (Target: Function) => {
      Target.routes = () => {
        router.stack.reverse();
        return router.routes();
      };
      Target.use = (...arg) => router.use(...arg);
      Target.allowedMethods = () => router.allowedMethods();
      return Target;
    },
    allowedMethods: (arg: any) => router.allowedMethods(arg),
  };
};

export default Blueprint;

global.Blueprint = Blueprint;
