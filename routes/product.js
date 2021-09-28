const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
    create,
    listAll,
    read,
    update,
    remove,
    list,
    productsCount,
    productStar,
    listRelated
} = require('../controllers/product');

const router = express.Router();

router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount)
router.get('/products/:count', listAll);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);

router.post('/products', list);

router.put('/product/star/:productId', authCheck, productStar);
router.get('/product/related/:productId', listRelated);

module.exports = router;
