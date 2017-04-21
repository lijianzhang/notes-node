/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 21:35:50
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-21 23:24:55
 * @flow
 */

import bodyParser from 'koa-bodyparser';
import Boom from 'boom';
import logger from 'koa-logger';
import App from './lib/App';
import './lib/blueprint';
import error from './middlewares/error';
import routes from './routes';
import config from './config';
import './lib/db';

const app = new App();

app.use(logger());

app.use(error);

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
