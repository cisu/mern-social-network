// like we using passport.js
const jwt = require('jsonwebtoken');
const config = require('config');

// export a middleware function
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    //  send status 401 with the msg
    return res.status(401).json({msg: 'No token, authorization denied'});
  }

  // Verify token
  try {
    // if there is a token and it's valid then it's doing to decode it through JWT verify.
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // then there is a token ⬆  we'll set the req.user to the user in that decoded token.
    // then we can use that req.user in any of our protected routes.
    req.user = decoded.user;
    next();
  } catch (err) {
    // if there is a token but it's not valid it's run this catch which we'll say msg: 'Token is not valid'
    res.status(401).json({msg: 'Token is not valid'});
  }
};
