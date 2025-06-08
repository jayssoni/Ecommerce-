const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbid");
const  {cloudinaryUploadImg}  = require("../utils/cloudinary");
const fs = require("fs");
// Create a product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all products
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        if (queryObj.price) {
            queryObj.price = Number(queryObj.price);
        }

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This Page does not exist");
        }

        const products = await query;
        res.json(products);
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error);
    }
});

// Add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;

    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === productId);
        if (alreadyAdded) {
            user.wishlist.pull(productId);
        } else {
            user.wishlist.push(productId);
        }
        await user.save();
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

// Rate a product
const rateProduct = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, productId, comment } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const alreadyRated = product.ratings.find(
            (rating) => rating.postedBy.toString() === _id.toString()
        );

        if (alreadyRated) {
            product.ratings = product.ratings.map((rating) =>
                rating.postedBy.toString() === _id.toString()
                    ? { ...rating, star, comment }
                    : rating
            );
        } else {
            product.ratings.push({
                star,
                comment,
                postedBy: _id,
            });
        }

        // Recalculate average rating
        const totalRating = product.ratings.length;
        const ratingSum = product.ratings.reduce((acc, curr) => acc + curr.star, 0);
        product.totalRating = Math.round(ratingSum / totalRating);

        await product.save();
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});


const uploadImages = asyncHandler(async (req, res) => {
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
            console.log(path)
            fs.unlinkSync(path); // Remove the file from the server after uploading to cloudinary
        }
        const findProduct = await Product.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => {
                    return file
                }),
            },
             { new: true },
        );
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getaProduct,
    getAllProduct,
    addToWishlist,
    rateProduct,
    uploadImages
};
