const authUserPassword = (req, res, next) => {
    const { password } = req.body;
  
    if (!password || password.length < 6) {
        return next('3');
}
    return next();
  };
  
  module.exports = authUserPassword;
