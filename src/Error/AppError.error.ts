class AppError extends Error {
  public statusCode: number;
  public errors?: Record<string, string[]>;

  constructor(
    message: string | Record<string, string[]>,
    statusCode = 400,
    errors?: Record<string, string[]>
  ) {
    super(typeof message === "string" ? message : JSON.stringify(message));
    this.statusCode = statusCode;
    this.errors = typeof message === "object" ? message : errors;
  }
}

export { AppError };
