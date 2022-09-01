const express=require("express")

const Post=require("../models/post.model")

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/",authenticate, async (req, res)=>{

    try{

        const post=await Post.find({}).exec()

        return res.status(200).send(post)
    }catch(e){

        res.status(500).send({message:e.message, status:"failed"})
    }

    


})

router.post("/",authenticate, async(req, res)=>{
    try{
        const user = req.user;

        const post = await Post.create({
          title: req.body.title,

         // body: req.body.body,
         
          user: user.user._id,
        });
    
        return res.status(201).json({ post });
      } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
      }
} )

router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    return res.status(201).send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "user_id", select: "first_name" })
      .populate("tag_ids")
      .lean()
      .exec();

    return res.send(posts);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

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


module.exports=router