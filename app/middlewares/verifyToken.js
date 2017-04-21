/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 22:34:55
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:54:25
 * @flow
 */

import jwt from 'jsonwebtoken';

const defaultOpts = {
  header: 'Authorization',
  secret: 'secret',
  key: 'user',
  tokenKey: 'token',
  refresh: 60 * 60 * 24,
};

export default function verifyToken(opts: Object) {
  const finalOpts = Object.assign({}, defaultOpts, opts);

  return async function middleware(ctx: Object, next: Function) {
    const token = ctx.request.body.token || ctx.request.headers[finalOpts.header];
    if (token) {
      try {
        const decodeToken = jwt.verify(token, finalOpts.secret);
        const { exp, iat, ...others } = decodeToken;
        const date = decodeToken.exp - decodeToken.iat;
        if (date <= finalOpts.refresh) {
          const token = jwt.sign({ ...others }, finalOpts.secret, { expiresIn: date });
          ctx.state[finalOpts.tokenKey] = token;
        } else {
          ctx.state[finalOpts.tokenKey] = token;
        }
        ctx.state[finalOpts.key] = decodeToken;
        await next();
      } catch (error) {
        ctx.throw(401, 'token is fail');
      }
    } else {
      ctx.throw(401, 'token not did find');
    }
  };
}
