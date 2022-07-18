const authUserEmail = (req, res, next) => {
    const { displayName, email } = req.body;
    if (!displayName || displayName.length < 8) {
      return next('1');
    }

    function validarEmail(e) {
        const re = /\S+@\S+\.\S+/;
        return re.test(e);
      }

   if (!validarEmail(email)) {
    return next('2');
   }
    return next();
  };
  
  module.exports = authUserEmail;