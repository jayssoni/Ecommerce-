const express = require('express');
const { createBrand, getBrand, updateBrand, getAllBrands, deleteBrand, getaBrand } = require('../controller/brandCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBrand);
router.get('/:id',  getBrand);
router.get('/',  getAllBrands);
router.put('/:id', authMiddleware, isAdmin, updateBrand);
router.delete('/:id', authMiddleware, isAdmin, deleteBrand);
router.get('/:id', authMiddleware, isAdmin, getaBrand);

module.exports = router;
