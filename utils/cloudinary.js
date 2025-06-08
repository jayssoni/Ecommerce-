const cloudinary = require("cloudinary"); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImg = async (fileToUpload) => {
return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUpload, (result) => {
      if (result?.error) {
        reject(result.error);
      } else {
        resolve({
          url: result?.secure_url,
          id: result?.public_id,
        },
        {
          resource_type: "auto", // Automatically determine the resource type (image, video, etc.)
        });
      }
    });
  });
};

module.exports = { cloudinaryUploadImg };