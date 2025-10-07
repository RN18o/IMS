const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.services");
const blackListTokenModel = require("../models/blacklistToken.model");
const sendEmail = require("../utils/sendEmail")

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone, Address, pincode } = req.body;

  const isAlreadyUser = await userModel.findOne({ email });

  if (isAlreadyUser) {
    return res.status(400).json({ message: "User Already Exist" });
  }

  const hashedPassword = await userModel.hashPassword(password);
  // console.log(req.body);

  const user = await userService.createUser({
    firstname: fullname?.firstname || '',
    lastname: fullname?.lastname || '',
    email,
    password: hashedPassword,
    phone,
    Address,
    pincode
  });
  const token = user.getAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  // console.log(req.body);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401).json({ message: "Invalid Email or Password" });
  }

  const token = await user.getAuthToken();

  res.cookie("token", token);

  res.status(200).json({ message: "User Logging SuccessFully", token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports.updateUserProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updates = {};
  const { fullname, email, password } = req.body;
  console.log("body", req.body);

  if (fullname) {
    if (fullname.firstname) updates['fullname.firstname'] = fullname.firstname;
    if (fullname.lastname) updates['fullname.lastname'] = fullname.lastname;
  }
  if (email) updates.email = email;
  if (password) updates.password = await userModel.hashPassword(password);

  try {
    const updated = await userService.updateUser(req.user._id, updates);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Profile updated', user: updated });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserProfile = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.user._id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};

module.exports.forgotPassord = async(req,res,next) => {
   const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({message:"User not found"});
  }
  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({message:"Internal server error"});
  }
}

module.exports.resetPassword = async(req,res,next) => {
   const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
   res.status(400).json({message: "Reset Password Token is invalid or has been expired"})
  }

  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).json({message:"Password does not match"})
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({message:"token send",user});
}