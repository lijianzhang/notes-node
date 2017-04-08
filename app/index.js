import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import redisStore from 'koa-redis';
import session from 'koa-generic-session';
import logger from 'koa-logger';
import './lib/blueprint';
import routes from './routes';
import config from './config';

const finallyConfig = config[process.env.NODE_ENV];

const app = new Koa();

app.keys = ['keys', 'keykeys'];

app.use(logger());

app.use(session({
  store: redisStore({}),
}));

app.use(bodyParser());
app.use(routes.routes());

app.listen(finallyConfig.port, () => {
  console.log(`程序启动,端口号为${finallyConfig.port}`);
});
