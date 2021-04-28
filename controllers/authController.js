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

  res.status(200).json({ message: 'success', user: existingUser });
});

exports.signup = expressAsyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName, passwordConfirm } = req.body;

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
    registeredAt: new Date().toISOString(),
  });

  const token = generateToken({ id: newUser._id });

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

exports.getUserPost = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await User.findById(id).populate('posts');

  res.status(201).json({
    message: 'success',
    data: { post: result },
  });
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
