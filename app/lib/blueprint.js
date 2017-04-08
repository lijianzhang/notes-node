import KoaRouter from 'koa-router';

const Blueprint = (prefix = '', ...rootMiddleware) => {
  const router = new KoaRouter({ prefix });

  const METHOD_TYPES = ['head', 'options', 'get', 'put', 'patch', 'post', 'delete'];

  function decorateRoter(path, methods, ...middleware) {
    return (target, key, descriptor) => {
      middleware.push(descriptor.value);
      methods.forEach(method => router[method](path, ...middleware));
      return descriptor;
    };
  }
  const methods = {};
  METHOD_TYPES.forEach((method) => {
    methods[method] = (path, ...middleware) => decorateRoter(path, [method], ...rootMiddleware, ...middleware);
  });

  return {
    methods: (path, methods = ['get'], ...middleware) => decorateRoter(path, methods, ...rootMiddleware, ...middleware),
    ...methods,
    use: (...arg) => router.use(...arg),
    routes: () => {
      router.stack.reverse();
      return router.routes();
    },
    class: (Target) => {
      Target.routes = () => {
        const obj = new Target();
        router.stack.reverse();
        router.stack.forEach((Layer) => {
          const last = Layer.stack.length - 1;
          Layer.stack[last] = Layer.stack[last].bind(obj);
        });
        return router.routes();
      };
      Target.use = (...arg) => router.use(...arg);
      return Target;
    },
    allowedMethods: router.allowedMethods,
  };
};

export default Blueprint;

global.Blueprint = Blueprint;
