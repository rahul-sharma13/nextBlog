import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
