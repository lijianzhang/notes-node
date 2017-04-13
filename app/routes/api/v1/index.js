import User from './user';

const v1 = Blueprint('v1');

v1.use(User.routes());

@v1.class
export default class V1 {
  @v1.get('/')
  static index(ctx) {
    ctx.body = 'v1';
  }
}
