import { connectDb } from "@/lib/db";
import { Note } from "@/lib/model/note";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  console.log("req-", req.users);
  console.log("res-", res);
  await mongoose.connect(connectDb);
  const data = await Note.find();
  return NextResponse.json({ result: data, success: true });
}

export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(connectDb);
  const note = new Note(payload);
  console.log("payload ->", payload);
  const result = await note.save();
  return NextResponse.json({ result, success: true });
}
