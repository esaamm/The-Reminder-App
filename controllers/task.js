import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user, // req.user contains details of logged in user from User collection .
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    console.log(req.user);

    const tasks = await Task.find({ user: userid }); // find method returns an array .

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    // const id = req.params.id;
    const { id } = req.params; // This will be the id of task and not the id of user .

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler());

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated !",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id; // This will be the id of task and not the id of user.

    const task = await Task.findById(id);

    if (!task)
      return next(new ErrorHandler("What are u doing man , Its Wrong !", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted !",
    });
  } catch (error) {
    next(error);
  }
};
