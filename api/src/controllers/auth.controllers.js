import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// user model
import User from "../models/user.model.js";

// for handleing responses and errors
import { ApiResponse } from "../utils/ApiResponse.js";
import { errorHandler } from "../utils/ApiError.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    // console.log("user changed is : ",user);
    console.log("token is generated: ", accessToken);

    return { accessToken };
  } catch (error) {
    console.log(error);
  }
};

export const userSignUp = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return next(errorHandler(409, "All fields are required."));
  }

  // hashing the password
  //   const hashedPassword = bcrypt.hashSync(password, 10);

  // if user exists return
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return next(errorHandler(409, "User already exists."));
  }

  // creating the new user
  const newUser = new User({
    email,
    password,
  });

  try {
    await newUser.save();
    const createdUser = await User.findById(newUser._id).select(
      "-password" // write those field which we dont want to send
    );
    return res.json(
      new ApiResponse(200, createdUser, "User is signed up successfully!")
    );
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // if empty fields
  if (!email || !password)
    return next(errorHandler(400, "All fields are required."));

  try {
    // if user found
    const validUser = await User.findOne({ email });

    if (!validUser)
      return next(errorHandler(404, "User not found, please sign up first"));

    // checking for password after decrypting
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    // assigning token to the user

    // const token = jwt.sign(
    //   { id: validUser._id },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   {
    //     expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    //   }
    // );

    const { accessToken } = await generateAccessAndRefreshTokens(validUser._id);

    // removing password field from the user
    const requiredUser = await User.findById(validUser._id).select("-password");

    // for safety
    const options = {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };

    return res
      .cookie("access_token", accessToken, options)
      .status(200)
      .json(new ApiResponse(200, requiredUser, "User signed in successfully."));
  } catch (error) {
    next(error);
  }
};
