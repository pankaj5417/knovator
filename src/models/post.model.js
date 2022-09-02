
const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    title: { type: String, required: true},
    body: { type: String, required: true},
    createdby:{},
    status:{},
    geolocation:[],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdb",
        required: false,
      }

},
{
    versionKey: false,
    timestamps: true,
})

module.exports=mongoose.model("post",postSchema)
