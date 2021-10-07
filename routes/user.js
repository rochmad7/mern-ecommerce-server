const express = require('express');
const { authCheck } = require('../middlewares/auth');
const {
    userCart,
    getUserCart,
    emptyCart,
    saveAddress,
    applyCoupon,
    createOrder,
    orders,
    addToWishlist,
    wishlist,
    removeFromWishlist,
    createCashOrder
} = require('../controllers/user');

const router = express.Router();

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

router.post('/user/cash-order', authCheck, createCashOrder);
router.post('/user/order', authCheck, createOrder);
router.get('/user/orders', authCheck, orders);

router.post('/user/cart/coupon', authCheck, applyCoupon);

router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, wishlist);
router.delete('/user/wishlist/:productId', authCheck, removeFromWishlist);

module.exports = router;
