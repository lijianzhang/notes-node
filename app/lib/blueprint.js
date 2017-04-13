import KoaRouter from 'koa-router';

// 支持的methods
const METHOD_TYPES = ['head', 'options', 'get', 'put', 'patch', 'post', 'delete'];

const Blueprint = (prefix = '', ...rootMiddleware) => {
  const router = new KoaRouter({ prefix });
  router.use(...rootMiddleware);

  function decorateRoter(path, methods, ...middleware) {
    return (target, key, descriptor) => {
      middleware.push(descriptor.value);
      methods.forEach(method => router[method](path, ...middleware));
      return descriptor;
    };
  }
  const methods = {};
  METHOD_TYPES.forEach((method) => {
    methods[method] = (path, ...middleware) => decorateRoter(path, [method], ...middleware);
  });

  return {
    ...methods,
    methods: (path, methods = ['get'], ...middleware) => decorateRoter(path, methods, ...middleware),
    use: (...arg) => router.use(...arg),
    routes: () => {
      router.stack.reverse();
      return router.routes();
    },
    redirect: (...arg) => router.redirect(...arg),
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
      Target.allowedMethods = () => router.allowedMethods();
      return Target;
    },
    allowedMethods: arg => router.allowedMethods(arg),
  };
};

export default Blueprint;

global.Blueprint = Blueprint;
