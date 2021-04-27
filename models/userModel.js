import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

const userSchema =  mongoose.Schema({
  firstName: {
    type: Schema.Types.String,
    required: [true, "Can't be blank"],
    trim: true,
    maxlength: 100
  },
  lastName: {
    type: Schema.Types.String,
    required: [true, "Can't be blank"],
    trim: true,
    maxlength: 100
  },
  email: {
    type: Schema.Types.String,
    required: [true, "Can't be blank"],
    unique: true,
    trim: true,
    select: false
  },
  password: {
    type: Schema.Types.String,
    select: false,
    required: [true, "Can't be blank"],
  },
  profilePicUrl: {
    type: Schema.Types.String,
    trim: true,
  },
  verified: {
    type: Schema.Types.Boolean,
    default: false
  },
  status: {
    type: Schema.Types.Boolean,
    default: true,
  }
}, {timeStamps: true})

userSchema.methods.setPassword = async function (password){
  const processing = await bcrypt.hash(password, 12);
  return hashedPassword = await processing;
}

userSchema.pre('save', async function(next) {
    // check to see if password is modified 
    if(!this.isModified("password")){
      next()
    }
    const processing = await bcrypt.hash(this.password, 12);
    this.password= await processing;
})

userSchema.methods.validatePassword = async  function(newPassword){
  return await bcrypt.compare(newPassword,this.password);
}




export const UserModel = mongoose.model('User', userSchema)

  
// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//   firstName: { type: String, required:  true },
//   lastName: { type: String, required:  true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   id: { type: String },
// });

// export const UserModel = mongoose.model('User', userSchema)
