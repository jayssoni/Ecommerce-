const express = require('express');
const { createCategory, getCategory, updateCategory, getAllCategories, deleteCategory, getaCategory } = require('../controller/productcategoryCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCategory);
router.get('/:id', authMiddleware, isAdmin, getCategory);
router.get('/', authMiddleware, isAdmin, getAllCategories);
router.put('/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);
router.get('/:id', authMiddleware, isAdmin, getaCategory);

module.exports = router;
