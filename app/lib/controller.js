import codeMessage from './code';

export default class controller {
  error(code = 404) {
    return {
      code,
      message: codeMessage[code] || 'error 没有找到对应的状态码',
      status: false,
    };
  }

  json(result, code = 200) {
    return {
      status: true,
      code,
      result,
      message: codeMessage[code],
    };
  }
}
