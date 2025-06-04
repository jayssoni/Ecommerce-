const express = require('express');
const { createCategory, getCategory } = require('../controller/productcategoryCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCategory);
router.get('/:id', authMiddleware, isAdmin, getCategory);

module.exports = router;
