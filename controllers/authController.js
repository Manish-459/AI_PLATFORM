const errorHandler = require("../middelwares/errorMiddleware");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errroResponse");

// JWT TOKEN
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};
exports.sendToken = sendToken;

//REGISTER
exports.registerContoller = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //exisitng user
    // console.log("checkpoint 1")
    const exisitingEmail = await userModel.findOne({ email:email });
    // console.log("checkpoint 2")
    if (exisitingEmail) {
      return next(new errorResponse("Email is already register", 400));
    }
    // console.log("checkpoint 3")
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

//LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    //res
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//LOGOUT
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
