import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import redisStore from 'koa-redis';
import Boom from 'boom';
import session from 'koa-generic-session';
import logger from 'koa-logger';
import './lib/blueprint';
import routes from './routes';
import config from './config';
import './lib/db';

const app = new Koa();

app.keys = ['keys', 'keykeys'];

app.use(logger());

app.use(session({
  store: redisStore({}),
}));

app.use(bodyParser());
app.use(routes.routes());
app.use(routes.allowedMethods({
  throw: true,
  notImplemented: () => Boom.notImplemented(),
  methodNotAllowed: () => Boom.methodNotAllowed(),
}));

app.listen(config.port, () => {
  console.log(`程序启动,端口号为${config.port}`);
});
