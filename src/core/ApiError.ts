class ApiError extends Error {
  public readonly status: number;
  public readonly url: string;

  constructor(status: number, url: string, message?: string) {
    super(message ?? `HTTP error! status: ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
  }
}

export default ApiError;
