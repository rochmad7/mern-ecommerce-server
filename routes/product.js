const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
    create,
    list,
    read,
    update,
    remove,
} = require('../controllers/product');

const router = express.Router();

router.post('/product', authCheck, adminCheck, create);
router.get('/products', list);

module.exports = router;
