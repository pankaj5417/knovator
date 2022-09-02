const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

require("dotenv").config();
const { register, login } = require("./controllers/auth.controller");
const postsController = require("./controllers/post.controller.js");

app.use(express.json());
app.use("/posts", postsController);

app.post(
  "/register",
  [
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 10,
      max: 20,
    }),
    check("mobile", "Mobile number should contains 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    check("password").custom(async (value) => {
      const regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(value);
      if (!regex) {
        throw new Error(
          "Password must be of 8 character,should contain one special character and must start with capital letter"
        );
      }
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      res.send("Successfully validated");
    }
  },
  register
);
app.post(
  "/login",
  [
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),

      check("password").custom(async (value) => {
        const regex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(value);
        if (!regex) {
          throw new Error(
            "Password must be of 8 character,should contain one special character and must start with capital letter"
          );
        }
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      res.send("Successfully validated");
    }
  },
  login
);

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else console.log("Connected to MongoDB");
});

app.listen(8000, () => {
  console.log("server is running");
});
