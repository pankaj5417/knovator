const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else console.log("Connected to MongoDB");
});

app.listen(8000, () => {
  console.log("server is running");
});