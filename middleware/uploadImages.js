const multer = require('multer');
const sharp = require('sharp');
const path = require('path');


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,file.fieldname + '-' + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};
const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
});


const productresizeImage = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(req.files.map(async (file) => {
    await sharp(file.path)
      .resize(300, 300)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/products/${file.filename}`);
  }));

  next();
};
const blogresizeImage = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(req.files.map(async (file) => {
    await sharp(file.path)
      .resize(300, 300)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/blogs/${file.filename}`);
  }));

  next();
};

module.exports = { uploadPhoto, productresizeImage, blogresizeImage };