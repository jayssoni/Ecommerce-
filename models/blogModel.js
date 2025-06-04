//blog model 
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
    },
   
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,       
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    image: {
      type: String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fblog&psig=AOvVaw0j563Q2ByyZ89QcEscGfao&ust=1749036316802000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCSs5yS1Y0DFQAAAAAdAAAAABAE"
    },
    author: {
      type: String,
      default: "Admin",
    },

  },
  {
   toJSON:{
    virtuals:true,
   },
   toObject:{
    virtuals:true,
   },
    timestamps: true,
  }
)

module.exports = mongoose.model("Blog", blogSchema);
