import dotenv from "dotenv";
import connectDb from "./src/db/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// different routings
import authRouter from "./src/routes/auth.routes.js";
import postRouter from "./src/routes/post.routes.js";

dotenv.config({
  path: "./env",
});

const app = express();

app.get("/", (req, res) => {
  res.send("server is up index!");
});

// middleware setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" })); // limit of acceptance of json data
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);
app.use(express.static("public"));
app.use(cookieParser());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// choosing the routes to send the request
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

// connecting to the database
connectDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Port is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED!! : ", err);
  });
