import { connectDb } from "@/lib/db";
import { Note } from "@/lib/model/note";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, res){
    const id = res.params.noteid
    console.log(id);
    const filter = {_id:id}
    const payload = await req.json();
    console.log(payload);
    await mongoose.connect(connectDb)
    const result = await Note.findOneAndUpdate(filter, payload)
    return NextResponse.json({result, success: true})
}

export async function GET(req, res){
    const id = res.params.noteid
    const record = {_id:id}
    await mongoose.connect(connectDb)
    const result = await Note.findById(record)
    return NextResponse.json({result, success: true})
} 

export async function DELETE(req, res){
    const id = res.params.noteid
    const record = {_id:id}
    await mongoose.connect(connectDb)
    const result = await Note.deleteOne(record)
    return NextResponse.json({result, success: true})
} 

