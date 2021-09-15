const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const { upload, remove } = require('../controllers/cloudinary');

const router = express.Router();

router.post('/upload-images', authCheck, adminCheck, upload);
router.post('/remove-images', authCheck, adminCheck, remove);

module.exports = router;
