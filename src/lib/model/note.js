import mongoose from "mongoose";

const noteModel = new mongoose.Schema(
  {
    title: String,
    description: String,
    newDate: String,
    userId: String,
    // user: {
    //   type: mongoose.ObjectId,
    //   ref: "users",
    // },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.models.notes || mongoose.model("notes", noteModel);
