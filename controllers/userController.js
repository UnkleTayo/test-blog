const expressAsyncHandler = require('express-async-handler');
const { User } = require('../models/userModel')
const {generateToken} = require('../utils/generateToken')


exports.login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = existingUser &&  existingUser.matchPassword(password)

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid Password' });

    const token = generateToken( { email: existingUser.email, id: existingUser._id })

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' });
  }
});

exports.signup =  expressAsyncHandler(async (req, res) => {
  const { email, password, firstName, lastName} = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const result = await User.create({
      firstName,
      lastName,
      email,
      password,
      createdAt: new Date().toISOString()
    });

    const token = generateToken({ email: result.email, id: result._id })

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
})

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
