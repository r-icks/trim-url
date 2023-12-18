import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.code === '23505') {
    defaultError.statusCode = StatusCodes.CONFLICT;
    const duplicateField = err.detail.match(/\("(.*?)"/)[1];
    defaultError.msg = `${duplicateField} field has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;