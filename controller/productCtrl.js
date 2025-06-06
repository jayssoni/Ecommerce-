const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createProduct = asyncHandler(async (req, res) => {
    try{
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);    
        }
        const newProduct = await Product.create(req.body);
        

        res.json(newProduct);
    }
    catch(error){
        throw new Error(error);
    }
  
});

//update a product
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

    }
    catch (error) {
        throw new Error(error);
    }   
})


//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
}); 

//get a product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//get all Product 
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        // Filtering
        const queryObj = {...req.query};
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        // Convert price to number if it exists
        if (queryObj.price) {
            queryObj.price = Number(queryObj.price);
        }

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Limiting Fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);

        }
        else {
            query = query.select('-__v');
        }
        // Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This Page does not exist");
        }

        // Execute query
        const products = await query;
        res.json(products);
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error);
    }
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {
        // Check if the product already exists in the user's wishlist
        const existingProduct = await Product.findOne({ _id: productId, wishlist: userId });

        if (existingProduct) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        // Add product to user's wishlist
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $addToSet: { wishlist: userId } },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        throw new Error(error);
    }
});
const removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {
        // Remove product from user's wishlist
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $pull: { wishlist: userId } },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = {
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishlist,
    removeFromWishlist
};