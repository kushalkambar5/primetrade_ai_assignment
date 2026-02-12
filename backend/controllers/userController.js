import User from "../models/userModel.js";
import HandleError from "../utils/HandleError.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";

//Signup
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    user,
  });
});

//Login
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(new HandleError("Invalid password", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
