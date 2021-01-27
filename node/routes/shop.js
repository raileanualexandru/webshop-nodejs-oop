const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) =>{
     Product.find((error, docs) => {
        res.render('shop.ejs', {produse: docs});
     });
    
})

module.exports = router; 