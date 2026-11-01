export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err instanceof ApiError ? err.status : 500;
  const code = err instanceof ApiError ? err.code : 'INTERNAL_ERROR';
  const message = err instanceof ApiError ? err.message : 'Something went wrong';

  res.status(status).json({ error: { message, code } });
};
