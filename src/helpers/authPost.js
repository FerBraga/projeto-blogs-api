const authPost = (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
      return next('5');
    }
    
    return next();
  };
  
  module.exports = authPost;