/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 22:36:21
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:43:13
 * @flow
 */

import Api from './api';
import Blueprint from '../lib/blueprint';
import Controller from '../lib/controller';

function abc(ctx, next) {
  next();
}

const api = Blueprint('', abc);
api.use(Api.routes());

export default api;

@api.class
export class Home extends Controller {

  @api.get('/')
  async index() {
    const { ctx } = this;
    ctx.body = '首页';
  }

  @api.methods('/test', ['get', 'post'])
  static async test(ctx) {
    ctx.body = 'test';
  }
}

