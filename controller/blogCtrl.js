const Blog = require("../models/blogCatModel");
const User = require("../models/userModel");
const aysncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

const createBlog = aysncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(
      newBlog,
    );
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = aysncHandler(async (req, res) => {
  const { id } = req.params;  
  validateMongoDbId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedBlog);
  } catch (error) {
    throw new Error(error);
  }
});
  

const getBlog = aysncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(blog , updateViews); 
  } catch (error) {
    throw new Error(error);
  }
});


const getAllBlogs = aysncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteBlog = aysncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    throw new Error(error);
  }
});


const likeBlog = aysncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId => userId?.toString() === loginUserId?.toString())
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }

  else {
    const blog = await Blog.findByIdAndUpdate(  
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
  
});


const dislikeBlog = aysncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // Find the blog which you want to be disliked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has disliked the blog
  const isDisliked = blog?.isDisliked;
  // find if the user has liked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId => userId?.toString() === loginUserId?.toString())
  );
  
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
  }

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }

  else {
    const blog = await Blog.findByIdAndUpdate(  
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
  
});

const uploadImages = aysncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path); // Remove the file from the server after uploading to cloudinary
        }
        const findBlog = await Blog.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => {
                    return file
                }),
            },
             { new: true },
        );
        res.json(findBlog);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog , uploadImages };
