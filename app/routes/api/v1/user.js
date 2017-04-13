import UserModel from '../../../models/user';
import controller from '../../../lib/controller';
const user = Blueprint('/user');

@user.class
export default class User extends controller {
  @user.post('/new')
  static async new(ctx) {
    const user = new UserModel(ctx.request.body);
    try {
      await user.save();
      ctx.body = this.json(user.info);
    } catch (error) {
      ctx.body = this.error(error.message);
    }
  }
}
