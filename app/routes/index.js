import Api from './api';

function abc (ctx, next) {
  next();
}

const api = Blueprint('', abc);
api.use(Api.routes());

@api.class
export default class Home {

  @api.get('/')
  static async index(ctx) {
    const session = ctx.session;
    session.num += 1;
    ctx.body = session;
  }

  @api.methods('/test', ['get', 'post'])
  static async test(ctx) {
    ctx.body = 'test';
  }
}

