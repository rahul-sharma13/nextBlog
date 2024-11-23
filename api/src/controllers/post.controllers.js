import Post from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { errorHandler } from "../utils/ApiError.js";

export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "All fields are required!"));
  }

  // console.log(req.user);
  // we have user id through the middleware
  const postCreated = new Post({
    ...req.body,
    authorId: req.user._id,
  });

  try {
    await postCreated.save();
    res
      .status(201)
      .json(new ApiResponse(201, postCreated, "Post created successfully."));
  } catch (error) {
    next(error);
  }
};

// getting user posts based on the time filter
export const getAllPosts = async (req, res, next) => {
  // taking time from the url query
  //   const inTime = req.query.inTime || "all";
  //   let allPosts;

  //   try {
  //     if (inTime === "all") {
  //       allPosts = await Post.find();
  //     } else if (inTime === "month") {
  //       const now = new Date();

  //       const oneMonthAgo = new Date(
  //         now.getFullYear(),
  //         now.getMonth() - 1,
  //         now.getDate()
  //       );

  //       allPosts = await Post.find({
  //         createdAt: { $gte: oneMonthAgo },
  //       }).populate({path : "authorId"});
  //     } else if (inTime === "week") {
  //       const now = new Date();

  //       const oneWeekAgo = new Date(
  //         now.getFullYear(),
  //         now.getMonth(),
  //         now.getDate() - 7
  //       );

  //       allPosts = await Post.find({
  //         createdAt: { $gte: oneWeekAgo },
  //       });
  //     } else if (inTime === "day") {
  //       const now = new Date();

  //       const oneDayAgo = new Date(
  //         now.getFullYear(),
  //         now.getMonth(),
  //         now.getDate() - 1
  //       );

  //       allPosts = await Post.find({
  //         createdAt: { $gte: oneDayAgo },
  //       });
  //     }
  try {
    const allPosts = await Post.find().populate({
      path: "authorId",
      select: "-_id -password",
    });

    res.status(200).json(new ApiResponse(200, allPosts, "All posts fetched!"));
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  const userId = req.user?._id;
  const getSpecificUser = req.query.authorId;

  try {
    const userToFetch = getSpecificUser || userId;

    if (!userToFetch) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "User ID is required"));
    }
    const postsOfTheUser = await Post.find({ authorId: userToFetch });

    res
      .status(200)
      .json(new ApiResponse(200, postsOfTheUser, "Posts fetched successfully"));
  } catch (error) {
    next(error);
  }
};
