const errors = [
    {
      status: 400,
      message: { message: 'Some required fields are missing' },
    },
  ];
  
  const errorMiddleware = (error, _req, res, _next) => {
     res.status(errors[error].status).json(errors[error].message);
  };
  
  module.exports = errorMiddleware;