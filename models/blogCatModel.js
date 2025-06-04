 const mongoose = require('mongoose');
const  blogcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    
}
, {
    timestamps: true
}   );

const BlogCategory = mongoose.model('blogCategory', blogcategorySchema);
module.exports = BlogCategory;
// This code defines a Mongoose schema for a category model in a Node.js application.
// The schema includes fields for the category name, slug, description, image, and creation date.