const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const resizeImg = require('resize-img');

//Get Product model

const Product = require('../models/product');


router.get('/', (req, res) =>{
    let count;
    Product.count(function(err, c){
        count = c;
    });

    Product.find(function(err, products){
res.render('products',{
    products: products,
    count: count
})
    });
});

module.exports = router;