import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const bcryptSalt = process.env.BCRYPT_SALT
const Schema = mongoose.Schema;

const userSchema =  mongoose.Schema({
  firstName: {
    type: Schema.Types.String,
    required: [true, "first name is required"],
    trim: true,
    maxlength: 100
  },
  lastName: {
    type: Schema.Types.String,
    required: [true, "Last Name is required"],
    trim: true,
    maxlength: 100
  },
  email: {
    type: Schema.Types.String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    select: false
  },
  password: {
    type: Schema.Types.String,
    select: false,
    required: [true, "Password is required"],
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



userSchema.pre('save', async function(next) {
    // check to see if password is modified 
    if(!this.isModified("password")){
      next()
    }
    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password= await hash;
    next()
})

userSchema.methods.matchPassword = async  function(newPassword){
  try{
    return await bcrypt.compare(newPassword,this.password);
  }
  catch(err){
    console.err(err)
  }
}




export const UserModel = mongoose.model('User', userSchema)

