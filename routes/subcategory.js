const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
    create,
    list,
    read,
    update,
    remove,
} = require('../controllers/subcategory');

const router = express.Router();

router.post('/subcategory', authCheck, adminCheck, create);
router.get('/subcategories', list);
router.get('/subcategory/:slug', read);
router.put('/subcategory/:slug', authCheck, adminCheck, update);
router.delete('/subcategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
