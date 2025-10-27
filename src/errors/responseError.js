export class ResponseError extends Error {
  constructor(status = 500, message = "Internal Server Error") {
    super(message);
    this.name = "ResponseError";
    this.status = status;
  }
}