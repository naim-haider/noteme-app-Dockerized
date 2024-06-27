import { comparePassword, hashPassword } from "@/lib/authhelper";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const JWT = require("jsonwebtoken");

// login user function //
export async function POST(req) {
  const payload = await req.json();
  const { password, email } = payload;

  //validation
  if (!email || !password) {
    return res.status(404).send({
      success: false,
      message: "Invalid email or password",
    });
  }

  //checkUser
  const user = await User.findOne({ email });

  //--validation--//
  //compareEmail
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "Email is not registered",
    });
  }

  //comparePassword
  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(200).send({
      success: false,
      message: "Invalid Password",
    });
  }

  //Token
  const token = await JWT.sign(
    { _id: user._id },
    process.env.NEXT_PUBLIC_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  await mongoose.connect(connectDb);
  return NextResponse.json({
    success: true,
    message: "login successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
}
