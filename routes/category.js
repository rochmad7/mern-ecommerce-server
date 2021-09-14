const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
    create,
    list,
    read,
    update,
    remove,
    getSubcategories
} = require('../controllers/category');

const router = express.Router();

router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);
router.get('/category/subcategory/:_id', getSubcategories)

module.exports = router;
