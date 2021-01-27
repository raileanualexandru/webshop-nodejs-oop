const mongoose = require('mongoose');

//Product Schema
const ProductSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

    });

    const Product = mongoose.model('Product', ProductSchema);

    module.exports = Product;