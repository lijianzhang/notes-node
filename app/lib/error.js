import httpCode from './code';

export default class KoaError extends Error {
  constructor(code: number = 500, message?: string) {
    super();
    if (!message && httpCode[code]) {
      message = httpCode[code];
    }
    Error.captureStackTrace(this, this.constructor);

    this.code = code;
    this.message = message;
  }
}
