const jwt  = require('jsonwebtoken');
const expressAsyncHandler  = require('express-async-handler');

exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  const headerParam = req.headers.authorization;
  if (headerParam && headerParam.startsWith('Bearer')) {
    try {
      token = headerParam.split(' ')[1];
      const decodeData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodeData?.email?.id
      console.log("Id",req.userId)
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized token, Failed!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
