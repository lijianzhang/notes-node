/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 22:27:25
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:51:26
 * @flow
 */

import codeMessage from './code';
import KoaError from './error';

export default class Controller {
  ctx: Object;

  error = (code: number, message?: string) => new KoaError(code, message);

  json(result: Object, code: number = 200, message?: string) {
    if (!message && codeMessage[code]) {
      message = codeMessage[code];
    }
    this.ctx.body = {
      status: true,
      code,
      result,
      message,
      token: this.ctx.state.token,
    };
  }
}
