const express = require("express");

const Post = require("../models/post.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const post = await Post.find({}).exec();

    return res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ message: e.message, status: "failed" });
  }
});

// retrieve post using latitude and longitude

// router.post("/", authenticate, async (req, res) => {
//   try {
//     const post = await Post.find({ geolocation: req.body.geolocation }).exec();

//     return res.status(200).send(post);
//   } catch (e) {
//     res.status(500).send({ message: e.message, status: "failed" });
//   }
// });

// show the count of active and inactive posts

// router.post("/", authenticate, async (req, res) => {
//   try {
//     const activePost = await Post.find.count({ status: active }).exec();
//     const inactivePost = await Post.find.count({ status: inactive }).exec();

//     return res.status(200).send({ activePost, inactivePost });
//   } catch (e) {
//     res.status(500).send({ message: e.message, status: "failed" });
//   }
// });

router.post("/", authenticate, async (req, res) => {
  try {
    const user = req.user;

    const post = await Post.create({
      title: req.body.title,

      body: req.body.body,
      createdby: req.body.createdby,
      status: req.body.status,
      geolocation: req.body.geolocation,

      user: user.user._id,
    });

    return res.status(201).json({ post });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const post = await Post.create(req.body);

//     return res.status(201).send(post);
//   } catch (e) {
//     return res.status(500).json({ message: e.message, status: "Failed" });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean().exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (req.body.userId === post.userId) {
      const updatedPost = await PostModel.updateOne({ $set: req.body });

      return res.status(200).json({
        updatedPost,
        message: " post updated",
      });
    } else {
      return res.status(500).json("You can only update your post");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await PostModel.deleteOne();

      return res.status(200).json({
        message: " post deleted",
      });
    } else {
      return res.status(500).json("You can only delete your post");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});


module.exports = router;
