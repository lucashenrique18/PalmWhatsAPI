const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {
    const authorization = req.headers.authorization;
    let result;
    if (authorization) {
      const token = authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '3h'
      };
      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decoded = result;
        next();
      } catch (err) {
        result = {
          status: 0,
          message: `Authentication error. Invalid token.`,
        };
        res.status(401).send(result);
      }
    } else {
      result = {
        status: 0,
        message: `Authentication error. Token required.`,
      };
      res.status(401).send(result);
    }
  }
};