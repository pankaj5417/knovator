const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const { register, login } = require("./controllers/auth.controller");
const postsController=require("./controllers/post.controller.js")

app.use(express.json());
app.use("/posts",postsController)

app.post("/register", register);
app.post("/login", login);
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else console.log("Connected to MongoDB");
});

app.listen(8000, () => {
  console.log("server is running");
});