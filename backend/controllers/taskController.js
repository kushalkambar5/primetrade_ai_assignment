import handleAsyncError from "../middlewares/handleAsyncError.js";
import HandleError from "../utils/HandleError.js";
import Task from "../models/taskModel.js";

//create task
export const createTask = handleAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  const { user } = req.user;

  if (!title || !description) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const task = await Task.create({ title, description, user });

  res.status(201).json({
    success: true,
    task,
  });
});

//get all tasks
export const getAllTasks = handleAsyncError(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    tasks,
  });
});

//get task
export const getTask = handleAsyncError(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate("user");

  if (!task) {
    return next(new HandleError("Task not found", 404));
  }

  res.status(200).json({
    success: true,
    task,
  });
});

//update task
export const updateTask = handleAsyncError(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate("user");

  if (!task) {
    return next(new HandleError("Task not found", 404));
  }

  task.title = req.body.title;
  task.description = req.body.description;

  await task.save();

  res.status(200).json({
    success: true,
    task,
  });
});

//delete task
export const deleteTask = handleAsyncError(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate("user");

  if (!task) {
    return next(new HandleError("Task not found", 404));
  }

  await task.remove();

  res.status(200).json({
    success: true,
    task,
  });
});
