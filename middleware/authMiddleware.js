const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const AppError = require('../utils/appErrorHandler');
const User = require('../models/userModel');

exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  const headerParam = req.headers.authorization;
  if (headerParam && headerParam.startsWith('Bearer')) {
    token = headerParam.split(' ')[1];

    if (!token) {
      return next(
        new AppError('You are not logged in, please login to get access', 401)
      );
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decodedData?.id);
    if (!freshUser) {
      return next(
        new AppError('The user belonging to the token does not exist', 401)
      );
    }

    if (freshUser.changedPasswordAfter(decodedData.iat)) {
      return next(
        new AppError('User recently changed password,Please login again', 401)
      );
    }
    req.user = freshUser;
    // verify jwt
    freshUser.changedPasswordAfter(decodedData.iat);
    next();
  }
});

exports.restrictTo = (...roles) => {
  return expressAsyncHandler(async (req, res, next) => {
    // roles is an array
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not permitted to perform this action', 403)
      );
    }

    next();
  });
};
