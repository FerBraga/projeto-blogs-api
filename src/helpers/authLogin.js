const authLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next('0');
    }
    // if (name.length < 5) {
    //   return next('3');
    // }
    return next();
  };
  
  module.exports = authLogin;