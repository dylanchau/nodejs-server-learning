const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: {
        message: 'Authorization fail',
      },
    });
  }
  try {
    const token = authorization.split(' ')[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!payload) {
      return res.status(401).json({
        error: {
          message: 'Authorization fail',
        },
      });
    }
    next();
  } catch (err) {
    res.status(401).json({
      error: {
        message: 'Authorization fail',
      },
    });
  }
};
