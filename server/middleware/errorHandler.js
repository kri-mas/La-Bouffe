const errorHandler = (err, req, res, next) => {
  console.error("error:", err.stack || err);

  const statusCode = res.statusCode && res.st !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "server error",
    ...err(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
export default errorHandler;
