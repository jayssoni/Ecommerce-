const blogCategoryCategory = require('../models/blogCatModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/validateMongodbid');

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await blogCategoryCategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const category = await blogCategoryCategory.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await blogCategoryCategory.find({});
        res.json(categories);
    } catch (error) {
        throw new Error(error);
    }
});
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updatedCategory = await blogCategoryCategory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error);
    }
});
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deletedCategory = await blogCategoryCategory.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getaCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const category = await blogCategoryCategory.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports={ createCategory, getCategory, getAllCategories, updateCategory, deleteCategory, getaCategory }