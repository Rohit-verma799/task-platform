import Task from "../models/Task.model.js";
import taskQueue from "../queue/taskQueue.js";
import redisConnection from "../config/redis.js";

export const createTask = async (req, res) => {
  try {
    const { title, inputText, operation } = req.body;

    if (!title || !inputText || !operation) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const allowedOperations = ["uppercase", "lowercase", "reverse", "wordcount"];

    if (!allowedOperations.includes(operation)) {
      return res.status(400).json({
        error: "Invalid operation type",
      });
    }


    const task = await Task.create({
      title,
      inputText,
      operation,
      userId: req.user._id
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).json({
        error: e.message,
      });
    }

    return res.status(500).json({
      error: "Internal Server Error",
      Msg: e.message
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    if (!tasks) {
      return res.status(200).json({ msg: "No tasks found" })
    }
    return res.status(200).json({ Tasks: tasks })
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        msg: "Task Not Found",
      });
    }


    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: "Unauthorized Access",
      });
    }

    return res.status(200).json({
      task,
    });

  } catch (e) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
export const startTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        msg: "Task Not Found",
      });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "Unauthorized Access",
      });
    }

    task.status = "pending";

    task.logs.push("Task added to queue");

    await task.save();

    await redisConnection.lpush(
      "taskQueue",
      JSON.stringify({
        taskId: task._id
      })
    );

    return res.status(200).json({
      msg: "Task Started Successfully",
      task,
    });

  } catch (e) {
    return res.status(500).json({
      msg: "Internal Server Error",
      Error: e.message
    });
  }
};