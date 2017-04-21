/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 22:49:34
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:58:01
 * @flow
 */

import jwt from 'jsonwebtoken';
import UserModel from '../../../models/user';
import Controller from '../../../lib/controller';
import Blueprint from '../../../lib/blueprint';
import verifyToken from '../../../middlewares/verifyToken';

const user = Blueprint('/user');

@user.class
export default class User extends Controller {

  @user.post('/join')
  async login() {
    const user = new UserModel(this.ctx.request.body);
    try {
      await user.save();
      this.createToken(user);
      this.json({ username: user.username });
    } catch (error) {
      throw this.error(403, error.message);
    }
  }


  @user.post('/auth')
  async auth() {
    const { username, password } = this.ctx.request.body;
    try {
      const user = await UserModel.verify(username, password);
      if (user) {
        this.createToken(user);
        this.json({ username: user.username });
      }
    } catch (error) {
      throw this.error(error.message);
    }
  }

  @user.post('/token', verifyToken)
  async token() {
    this.ctx.body = this.json({ data: '123' });
  }

  createToken(user: UserModel) {
    const token = jwt.sign({ isu: user.username }, 'secret', { expiresIn: 60 * 60 * 24 * 7 });
    this.ctx.state.token = token;
  }
}
