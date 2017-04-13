/*
 * @Author: lijianzhang 
 * @Date: 2017-04-12 23:23:01 
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-14 01:20:25
 */

import crypto from 'crypto';
import assert from 'assert';
import Model from '../lib/Model';


export default class User extends Model {
  collection = 'users';

  static get schema() {
    return ['hashPassword'];
  }

  configure() {
    this.beforeCreate(this.createUser);
  }

  async createUser() {
    assert.ok(this.username, 601);
    assert.ok(this.hashPassword, 601);
    const users = await User.limit(1).find({ username: this.username });
    if (users.length) {
      throw new Error(602);
    }
  }

  get password() {
    return this.hashPassword;
  }

  set password(value) {
    const sha256 = crypto.createHash('sha256');
    this.hashPassword = sha256.update(value).digest('hex');
  }

  get info() {
    return {
      username: this.username,
    };
  }
}

