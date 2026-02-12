import User from "../models/userModel.js";
import HandleError from "../utils/HandleError.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import sendToken from "../utils/jwtToken.js";

//Signup
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
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

  sendToken(user, 200, res);
});

//Logout
export const logoutUser = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

//Get user
export const getUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Change password
export const changePassword = handleAsyncError(async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  user.password = password;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
