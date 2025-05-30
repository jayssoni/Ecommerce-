const express = require('express')
const router = express.Router();
const { createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateaUser, blockUser, unblockUser, handleRefreshToken, logout } = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');

router.post('/register',createUser);
router.post('/login',loginUserCtrl);
router.get('/all-users',getAllUsers);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logout);

router.get('/:id',authMiddleware,isAdmin,getaUser);
router.delete('/:id',deleteaUser);
router.put('/edit-user',authMiddleware,updateaUser);
router.put('/block-user/:id',authMiddleware, isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware, isAdmin,unblockUser);

module.exports = router;


