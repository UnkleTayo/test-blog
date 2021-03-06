const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const bcryptSalt = process.env.BCRYPT_SALT;
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    username: {
      type: Schema.Types.String,
      required: false,
      trim: true,
      unique: true
    },
    firstName: {
      type: Schema.Types.String,
      required: [true, 'First name is required'],
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
      default: ""
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
      select: false,
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
    role: {
      type: Schema.Types.String,
      enum: ['user', 'writer'],
      default: 'user',
    },
    passwordChangedAt: {
      type: Schema.Types.Date,
    },
    passwordResetToken: {
      type: Schema.Types.String,
    },
    passwordResetExpires: {
      type: Schema.Types.Date,
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    active: {
      type: Schema.Types.Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // check to see if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = await hash;

  // This will remove password confirm from what we send to the database
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // points to current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.matchPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    console.error(err);
  }
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = +(this.passwordChangedAt.getTime() / 1000);
    // console.log(changedTimestamp, JWTTimestamp);
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(12).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log(resetToken, 'Password reset token', this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
