class ApiErrorResponse extends Error {
  statusCode: number;
  errors?: any;

  constructor(
    statusCode: number,
    message: string,
    errors?: any,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    if (errors) this.errors = errors;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiErrorResponse;
