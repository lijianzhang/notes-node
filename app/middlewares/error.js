export default async function error(ctx, next) {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.app.emit('error', error, ctx);
  }
}
