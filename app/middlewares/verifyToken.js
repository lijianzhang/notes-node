import jwt from 'jsonwebtoken';

const defaultOpts = {
  header: 'Authorization',
  secret: 'secret',
  key: 'user',
  tokenKey: 'token',
  refresh: 60 * 60 * 24,
};

export default function verifyToken(opts) {
  const finalOpts = Object.assign({}, defaultOpts, opts);

  return async function middleware(ctx, next) {
    const token = ctx.request.body.token || ctx.request.headers[finalOpts.header];
    if (token) {
      try {
        const decodeToken = jwt.verify(token, finalOpts.secret);
        const { exp, iat, ...others } = decodeToken;
        const date = decodeToken.exp - decodeToken.iat;

        ctx.state[finalOpts.key] = decodeToken;
        ctx.state[finalOpts.tokenKey] = token;
        await next();
        if (date <= finalOpts.refresh) {
          const token = jwt.sign({ ...others }, finalOpts.secret, { expiresIn: date });
          ctx.body.token = token;
        }
      } catch (error) {
        ctx.throw(401, 'token is fail');
      }
    } else {
      ctx.throw(401, 'token not did find');
    }
  };
}
