const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const AppError = require('../utils/appErrorHandler');

exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  const headerParam = req.headers.authorization;
  if (headerParam && headerParam.startsWith('Bearer')) {
    token = headerParam.split(' ')[1];
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeData?.id?.id;
    next();
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, please login to get access', 401)
    );
  }
});
