import jwt from 'jsonwebtoken';
import UserModel from '../../../models/user';
import controller from '../../../lib/controller';
import verifyToken from '../../../middlewares/verifyToken';
const user = Blueprint('/user');

@user.class
export default class User extends controller {
  @user.post('/auth')
  async auth(ctx) {
    const user = new UserModel(ctx.request.body);
    try {
      await user.save();
      const token = jwt.sign({ isu: user.username }, 'secret', { expiresIn: 60 * 60 * 24 * 7 });
      ctx.state.token = token;
      ctx.body = this.json({
        username: user.username,
      });
    } catch (error) {
      throw new Error(error);
      ctx.body = this.error(error.message);
    }
  }

  @user.post('/token', verifyToken())
  async token(ctx) {
    ctx.body = this.json({data: '123'});
  }
}
