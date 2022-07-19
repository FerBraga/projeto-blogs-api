const categoryName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      return next('4');
    }
    return next();
  };
  
  module.exports = categoryName;