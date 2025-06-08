const express = require('express');
const { createCoupan, updateCoupan, getAllCoupans, deleteCoupan, getCoupan } = require('../controller/coupanCtrl');
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupan);
router.put('/:id', authMiddleware, isAdmin, updateCoupan);
router.get('/:id', authMiddleware, getCoupan);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupan);   
router.get('/', getAllCoupans);
module.exports = router;
