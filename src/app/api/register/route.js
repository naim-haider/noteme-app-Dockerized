import { comparePassword, hashPassword } from "@/lib/authhelper";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const JWT = require("jsonwebtoken");

// register user function //
export async function POST(req) {
  try {
    const payload = await req.json();
    const { password, name, email } = payload;
    const hashedPassword = await hashPassword(password);
    await mongoose.connect(connectDb);
    const user = new User({ name, email, password: hashedPassword });
    const result = await user.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log("error in register function", error);
  }
}
