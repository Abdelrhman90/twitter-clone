import AppError from "./appError.js";

const handleValidateError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleCastError = (err) => {
  const message = `Invalid Data Provided`;
  return new AppError(message, 400);
};

const sendErr = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;
  if (err.name === "ValidationError") error = handleValidateError(error);
  if (err.name === "CastError") error = handleCastError(error);

  sendErr(error, res);
};

export default globalErrorHandler;
