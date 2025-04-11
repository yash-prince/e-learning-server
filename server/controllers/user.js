import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from '../middlewares/sendMail.js';
import TryCatch from '../middlewares/TryCatch.js';

export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);
  user = {
    name,
    email,
    password: hashPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_secret,
    {
      expiresIn: "1hr",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "e learning", data);

  res.status(200).json({
    message: "Otp sent to your mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_secret);

  if (!verify) {
    
    return res.status(400).json({
      message: "Otp expired",
    });
  }

  if (verify.otp !== otp) {
    return res.status(400).json({
      message: "Wrong otp",
    });
  }
  
  

  await User.create({
    name:verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  })

  res.json({
    message: " User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({ email });
  
  if (!user)
    return res.status(400).json({
  message: "No user with this email",
});

  const mathPassword = await bcrypt.compare(password , user.password);
   if (!mathPassword)
    return res.status(400).json({
  message: "wrong password ",
});

const token = jwt.sign({_id: user._id}, process.env.jwt_sec,{
  expiresIn: "30d" ,
});

res.json({
  message: `welcome back ${user.name}`,
  token,
  user,
})
});

export const myProfile = TryCatch(async(req, res) => {
  const user = await User.findById(req.user._id)

  res.json({ user });
})