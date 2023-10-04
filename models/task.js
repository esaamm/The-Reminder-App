import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false, // Todo list jb hm create krte hain tb checkbox uncheck rhta hai is false ki wjah se .
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Here we give name of collection .
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model("Task", schema);
// collection(table) name is Task .
