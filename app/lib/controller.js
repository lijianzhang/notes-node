import codeMessage from './code';

export default class controller {
  error(code = 404) {
    this.ctx.body = {
      code,
      message: codeMessage[code] || 'error 没有找到对应的状态码',
      status: false,
    };
  }

  json(result, code = 200) {
    this.ctx.body = {
      status: true,
      code,
      result,
      message: codeMessage[code],
      token: this.ctx.state.token,
    };
  }
}
