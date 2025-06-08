const express = require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rateProduct, uploadImages } = require('../controller/productCtrl');
const { isAdmin , authMiddleware} = require('../middleware/authMiddleware');
const { uploadPhoto, productresizeImage } = require('../middleware/uploadImages');
const router = express.Router();


router.post('/', authMiddleware,isAdmin,createProduct);
router.put('/upload/:id', authMiddleware,isAdmin, uploadPhoto.array("images", 10), productresizeImage,uploadImages );
router.get('/:id',getaProduct);
router.put('/addToWishlist', authMiddleware,addToWishlist);
router.put('/rating', authMiddleware,rateProduct);

router.put('/:id', authMiddleware,isAdmin,updateProduct);
router.get('/',getAllProduct);
router.delete('/:id', authMiddleware,isAdmin,deleteProduct);

module.exports = router;