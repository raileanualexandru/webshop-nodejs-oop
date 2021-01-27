const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

router.get('/add-to-cart/:id', (req, res) =>{

    let productId = req.params.id;
    //console.log(productId)
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product)=>{
        if(err){
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
       // console.log(req.session.cart);
        res.redirect('/shop');
    });
})

module.exports = router;