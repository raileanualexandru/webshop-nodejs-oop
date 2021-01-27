const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

router.get('/', (req, res) =>{
    if(!req.session.cart){
   return res.render('cart.ejs',{products: null});
    }      
    
    let cart = new Cart(req.session.cart);
    res.render('cart.ejs',{products: cart.generateArray(),totalPrice: cart.totalPrice});
  
    
})

module.exports = router;