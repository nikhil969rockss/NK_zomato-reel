declare global {
  interface ApiError {
    statusCode?: number;
    message: string;
    errors?: any;
    stack?: string;
  }
}
export {};
