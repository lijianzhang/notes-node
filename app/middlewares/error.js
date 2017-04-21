/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 21:21:48
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:44:14
 * @flow
 */


export default async function error(ctx: Object, next: Function) {
  try {
    await next();
  } catch (error) {
    ctx.status = error.code || 500;
    ctx.body = error;
  }
}
