const express = require('express')
const router = express.Router();
const { createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateaUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWhishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus } = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');

router.post('/register',createUser);
router.post('/forgot-password-token',forgotPasswordToken);
router.put('/reset-password/:token',resetPassword);
router.put('/order/update-order/:id',authMiddleware,isAdmin,updateOrderStatus);


router.put('/Password',authMiddleware,updatePassword);
router.post('/login',loginUserCtrl);
router.post('/admin-login',loginAdmin);
router.post('/cart',authMiddleware,userCart);
router.post('/cart/applycoupon',authMiddleware,applyCoupon);
router.post('/cart/cash-order',authMiddleware,createOrder);
router.get('/all-users',getAllUsers);
router.get('/get-orders',authMiddleware,getOrders);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logout);

router.get('/:id',authMiddleware,isAdmin,getaUser);
router.delete('/empty-cart',authMiddleware,emptyCart);
router.delete('/:id',deleteaUser);
router.put('/edit-user',authMiddleware,updateaUser);
router.put('/save-address',authMiddleware,saveAddress);
router.put('/block-user/:id',authMiddleware, isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware, isAdmin,unblockUser);
router.get('/wishlist', authMiddleware, getWhishlist);
router.get('/cart', authMiddleware, getUserCart);

module.exports = router;


