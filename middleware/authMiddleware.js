import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { UserModel } from '../models/userModel';

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  const headerParam = req.headers.authorization;
  if (headerParam && headerParam.startsWith('Bearer')) {
    try {
      token = headerParam.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decode.id).select('-password');
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
