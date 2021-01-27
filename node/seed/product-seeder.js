const Product = require('../models/product');
const mongoose = require('mongoose');
const config = require('../config/dababase');

//conect to db
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true });


let products = [
    new Product({
        image: 'images/img-pro-01.jpg',
        description: 'aaaaaaaaaaaaaaaaaaaa',
        price: 15
    }),
    new Product({
        image: 'images/img-pro-02.jpg',
        description: 'bbbbbbbbbbbbbbbbbbbb',
        price: 15
    }),
    new Product({
        image: 'images/img-pro-03.jpg',
        description: 'ccccccccccccccc',
        price: 15
    }),
    new Product({
        image: 'images/img-pro-01.jpg',
        description: 'dddddddddddddddddd',
        price: 15
    }),
    new Product({
        image: 'images/img-pro-02.jpg',
        description: 'eeeeeeeeeeeeeeeeeee',
        price: 15
    }),
    new Product({
        image: 'images/img-pro-03.jpg',
        description: 'fffffffffffffffffffffff',
        price: 15
    }),

];



let done = 0;

for(let i = 0; i < products.length; i++){
    products[i].save((err, result) => {
        done++;
        if(done === products.length){
            console.log('all products was saved!')
            exit();
        }
    });
}

const exit = () =>{
mongoose.disconnect();
}