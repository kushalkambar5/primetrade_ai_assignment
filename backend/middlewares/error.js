import HandleError from "../utils/HandleError.js";

const errorHandler = (err, req, res, next) => {
  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages[0],
    });
  }

  // Cast Error
  if (err.name === "CastError") {
    err = new HandleError(`Invalid ${err.path}`, 400);
  }

  // Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new HandleError(
      `${field} already exists, please Login to continue`,
      400,
    );
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
