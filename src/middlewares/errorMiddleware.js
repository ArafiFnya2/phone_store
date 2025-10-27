export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const bodyStatus = status >= 500 ? "error" : "fail";

  res.status(status).json({
    status: bodyStatus,
    message: err.message || "Internal Server Error",
  });
};