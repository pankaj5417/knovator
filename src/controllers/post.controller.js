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


// retrieve post using latitude and longitude

router.post("/",authenticate, async (req, res)=>{

  try{

      const post=await Post.find({geolocation:req.body.geolocation}).exec()

      return res.status(200).send(post)
  }catch(e){

      res.status(500).send({message:e.message, status:"failed"})
  }

  })


  // show the count of active and inactive posts

  router.post("/",authenticate, async (req, res)=>{

    try{
  
        const activePost=await Post.find.count({status:active}).exec()
        const inactivePost=await Post.find.count({status:inactive}).exec()
  
        return res.status(200).send({activePost,inactivePost})
    }catch(e){
  
        res.status(500).send({message:e.message, status:"failed"})
    }
  
    })

router.post("/",authenticate, async(req, res)=>{
    try{
        const user = req.user;

        const post = await Post.create({
          title: req.body.title,

          body: req.body.body,
          createdby:req.body.createdby,
          status:req.body.status,
          geolocation:req.body.geolocation,
         
          user: user.user._id,
        });
    
        return res.status(201).json({ post });
      } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
      }
} )

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



router.put("/:id", async(req, res)=>{
  try{
      const post= await PostModel.findById(req.params.id)
      if(req.body.userId===post.userId){
          const updatedPost= await PostModel.updateOne({$set:req.body})

          return res.status(200).json({
              updatedPost,message:" post updated"
          })
      }else{
          return res.status(500).json("You can only update your post")
      }
  
      }catch(err){
          return res.status(403).json(err)
      }

  
})

//delete a post

router.delete("/:id", async(req, res)=>{
  try{
      const post= await PostModel.findById(req.params.id)
      if(req.body.userId===post.userId){
           await PostModel.deleteOne()

          return res.status(200).json({
          message:" post deleted"
          })
      }else{
          return res.status(500).json("You can only delete your post")
      }
  
      }catch(err){
          return res.status(403).json(err)
      }

  
})

//like a post
router.put('/:id/likes', async(req,res)=>{
 try {
     const post= await PostModel.findById(req.params.id)

     if(!post.likes.includes(req.body.userId)){
         await post.updateOne({$push:{likes:req.body.userId}})
         return res.status(200).json("the post has been liked")
     }else{
         await post.updateOne({$pull:{likes:req.body.userId}})
         return res.status(200).json("the post is disliked")
     }
 } catch (error) {
     return res.status(403).json(error)
     
 }
})

//get a post

router.get('/:id', async(req, res)=>{
  try {
      const post= await PostModel.findById(req.params.id)
      return res.status(200).send(post)
      
  }catch(error) {
      return res.status(403).json(error)
      
  }
})

// get timeline posts
router.get("/timeline/:userId", async(req,res)=>{
  
  try {
      const currentUser=await UserModel.findById(req.params.userId)
      const userPosts= await PostModel.find({userId:currentUser._id})
      const friendPosts= await Promise.all(
          currentUser.following.map(friendId=>{
             return PostModel.find({userId:friendId})
          })
      )
     // const timelinePosts=userPosts.concat(...friendPosts)
      return res.status(200).send(userPosts.concat(...friendPosts))
  } catch (error) {
      return res.status(500).json(error)
  }
})

//get user's all posts

router.get("/profile/:firstname", async(req,res)=>{
  
  try {
      const user=await UserModel.findOne({firstname:req.params.firstname})
      console.log("firstname",req.params.firstname)
     const posts=await PostModel.find({userId:user._id})
     return res.status(200).send(posts)
  } catch (error) {
      return res.status(500).json(error)
  }
})


module.exports=router