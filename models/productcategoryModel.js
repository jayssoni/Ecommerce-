 const mongoose = require('mongoose');
const  productcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

const ProductCategory = mongoose.model('productCategory', productcategorySchema);
module.exports = ProductCategory;
// This code defines a Mongoose schema for a category model in a Node.js application.
// The schema includes fields for the category name, slug, description, image, and creation date.