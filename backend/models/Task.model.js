import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    inputText: {
      type: String,
      required: true,
    },

    operation: {
      type: String,
      enum: ["uppercase", "lowercase", "reverse", "wordcount"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "running", "success", "failed"],
      default: "pending",
    },

    result: {
      type: String,
      default: "",
    },

    logs: {
      type: [String],
      default: [],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;