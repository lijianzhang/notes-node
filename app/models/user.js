/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 22:45:46
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:57:19
 * @flow
 */

/*
 * @Author: lijianzhang
 * @Date: 2017-04-12 23:23:01
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-18 00:07:16
 */

import crypto from 'crypto';
import assert from 'assert';
import Model from '../lib/Model';


export default class User extends Model {
  collection = 'users';

  static get schema() {
    return ['hashPassword'];
  }

  get password(): string {
    return this.hashPassword;
  }

  set password(value: string) {
    this.hashPassword = User.encryption(value);
  }

  static encryption(password: string): string {
    const sha256 = crypto.createHash('sha256');
    return sha256.update(password).digest('hex');
  }

  configure() {
    this.beforeCreate(this.createUser);
  }

  async createUser() {
    assert.ok(this.username, '601');
    assert.ok(this.hashPassword, '601');
    const user = await User.findOne({ username: this.username });
    if (user) {
      throw new Error('账号已存在, 请重新输入用户名');
    }
  }

  static async verify(username: string, password: string) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('账号或密码错误');
    }

    if (user.hashPassword === User.encryption(password)) {
      return user;
    }

    throw new Error('账号或密码错误');
  }

  get info(): Object {
    return {
      username: this.username,
    };
  }
}
