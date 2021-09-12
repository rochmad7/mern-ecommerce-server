const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
    res.json('kboom');
});

module.exports = router;