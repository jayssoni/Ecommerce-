 const mongoose = require('mongoose');
const  brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

}
, {
    timestamps: true
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand ;
// This code defines a Mongoose schema for a brand model in a Node.js application.
// The schema includes fields for the brand name, slug, description, image, and creation date.