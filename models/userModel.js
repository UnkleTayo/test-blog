const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const bcryptSalt = process.env.BCRYPT_SALT;
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: [true, 'first name is required'],
      trim: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: [true, 'Last Name is required'],
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: Schema.Types.String,
      select: false,
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
    passwordConfirm: {
      type: Schema.Types.String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    profilePicUrl: {
      type: Schema.Types.String,
      trim: true,
      select: false,
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
      select: false,
    },
    registeredAt: {
      type: Schema.Types.Date,
    },
    lastLogin: {
      type: Schema.Types.Date,
    },
    intro: {
      type: Schema.Types.String,
      maxlength: 150,
    },
    profile: {
      type: Schema.Types.String,
      maxlength: 500,
    },
    updatedAt: {
      type: Date,
    },
    Posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timeStamps: true, toJSON: { virtuals: true } }
);

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'author',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  // check to see if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = await hash;

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.matchPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    console.error(err);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
