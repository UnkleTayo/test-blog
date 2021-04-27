import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const secret = process.env.JWT_SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = UserModel.validatePassword(password)

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid Password' });

    const token = generateToken( { email: existingUser.email, id: existingUser._id })

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName} = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const result = await UserModel.create({
      firstName,
      lastName,
      email,
      password
    });

    const token = generateToken({ email: result.email, id: result._id })

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
