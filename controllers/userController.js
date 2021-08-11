const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const AppError = require('../utils/appErrorHandler');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

/** 
@Des  Get all users
@route POST /api/v1/auth/users
@access Private/admin
*/

exports.getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find({});
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {users},
  });
});

/** 
@Des  Create single user
@route POST /api/v1/auth/users
@access Private/admin
*/

exports.createUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: {user},
  });
});

/** 
@Des  Get single users
@route POST /api/v1/auth/users/:id
@access Private/admin
*/
exports.getUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('No User found with that  ID', 404));
  }
  res.status(200).json({
    message: 'success',
    data: {user} ,
  });
});


exports.getUserPost = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('blogs');
  if (!user) {
    return next(new AppError('No post found with that  ID', 404));
  }
  res.status(200).json({
    message: 'success',
    data: { user },
  });
});

exports.updateMe = expressAsyncHandler(async (req, res, next) => {
  // create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update, please use /resetPassword',
        400
      )
    );
  }
  // if not update the user document
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'email',
    'profile',
    'intro'
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { ...filteredBody },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = expressAsyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: 'success',
    data: {},
  });
});
