const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('shop-detail.ejs');
})

module.exports = router;