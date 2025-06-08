const express = require("express");

const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");
const { createBlog ,updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog} = require("../controller/blogCtrl");
const { uploadPhoto, blogresizeImage } = require("../middleware/uploadImages");
const { uploadImages } = require("../controller/productCtrl");
const router = express.Router();


router.post("/", authMiddleware, isAdmin, createBlog);
router.put('/upload/:id', authMiddleware,isAdmin, uploadPhoto.array("images", 2), blogresizeImage,uploadImages );

router.put("/likes", authMiddleware , likeBlog);
router.put("/dislikes", authMiddleware , dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id",getBlog)
router.get("/", getAllBlogs);
router.delete("/:id",authMiddleware,isAdmin,deleteBlog)

module.exports = router;