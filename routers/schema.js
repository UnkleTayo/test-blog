import Joi from 'joi'

const personID = Joi.string().guid({version: 'uuidv4'});
// for editing password
const authDataSchema = Joi.object({
  teacherId: personID.required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required().strict(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});

export const validateUserOnSignIn =(user) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(500).required(),
    password: Joi.string().min(8).max(1024).required().strict(),
  })
  return schema.validate(user)
  }
  

  export const validateMiddleware = (validator) => {
    return (req, res, next) => {
      const {error} = validator(req.body)
      if (error) {
        return res.status(400).send(error.details[0].message)
      }
      next()
    }
  }