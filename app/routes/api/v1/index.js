const v1 = Blueprint('v1');

@v1.class
export default class V1 {
  @v1.get('/')
  index(ctx) {
    ctx.body = 'v1';
  }
}
