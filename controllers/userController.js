const expressAsyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const AppError = require('../utils/appErrorHandler');
const generateToken = require('../utils/generateToken');

exports.login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select('+password');

  if (!existingUser) return next(new AppError('User does not exist', 404));

  const isPasswordCorrect =
    existingUser && (await existingUser.matchPassword(password));

  if (!isPasswordCorrect) return next(new AppError('Incorrect password', 401));

  const token = generateToken({
    email: existingUser.email,
    id: existingUser._id,
  });

  res.status(200).json({ message: 'success', token });
});

exports.signup = expressAsyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName, passwordConfirm } = req.body;

  // try {
  //   const existingUser = await User.findOne({ email });

  //   if (existingUser) {
  //     res.status(400).json({ message: 'User already exists' });
  //     return;
  //   }

  //   const newUser = await User.create({
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     passwordConfirm,
  //     createdAt: new Date().toISOString(),
  //   });

  //   const token = generateToken({ id: newUser._id });

  //   res.status(201).json({ status: 'success', token, data: { user: newUser } });
  // } catch (error) {
  //   res.status(500).json({ message: error });
  // }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError('User already exists', 404));
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    createdAt: new Date().toISOString(),
  });

  const token = generateToken({ id: newUser._id });

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

// export const requestPassowrdReset = async (req, res) => {
//   const {email} = req.body;

//   const existingUser = await UserModel.findOne({email});
//   if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

//   let token = await TokenModel.findOne({userId: existingUser._id})
//   if(token) await token.deleteOne();
//   let resetToken = crypto.randomBytes(32).toString("hex")
//   const hash = await bcrypt.hash(resetToken,Number(bcryptSalt))

//   const newToken = await TokenModel.create({
//     userId: existingUser._id,
//     token: hash,
//     createdAt: Date.now()
//   })

//   const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
// }
