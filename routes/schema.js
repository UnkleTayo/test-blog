const Joi = require('joi');
const AppError = require('../utils/appErrorHandler');

const personID = Joi.string().guid({ version: 'uuidv4' });
// for editing password
const authDataSchema = Joi.object({
  teacherId: personID.required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required().strict(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
});

exports.validateUserOnSignIn = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(500).required(),
    password: Joi.string().min(8).max(1024).required().strict(),
  });
  return schema.validate(user);
};

exports.validateMiddleware = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      return new AppError(error.details[0].message, 400);
    }
    next();
  };
};
