const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Duplicate Entry',
      details: err.errors.map(e => e.message)
    });
  }

  // generic error
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

export default errorHandler;