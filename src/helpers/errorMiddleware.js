const errors = [
    {
      status: 400,
      message: { message: 'Some required fields are missing' },
    },
    {
      status: 400,
      message: { message: '"displayName" length must be at least 8 characters long' },
    },
    {
      status: 400,
      message: { message: '"email" must be a valid email' },
    },
    {
      status: 400,
      message: { message: '"password" length must be at least 6 characters long' },
    },
    {
      status: 400,
      message: { message: '"name" is required' },
    },

  ];
  
  const errorMiddleware = (error, _req, res, _next) => {
     res.status(errors[error].status).json(errors[error].message);
  };
  
  module.exports = errorMiddleware;